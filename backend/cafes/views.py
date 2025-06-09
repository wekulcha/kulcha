from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from django.db.models import Sum, Count, Avg, F
from django.db import connection
from .models import City, Cafe, CafeContact, MenuItem, Order, OrderItem, UserAddress
from .serializers import (
    CitySerializer, CafeSerializer, CafeContactSerializer,
    MenuItemSerializer, OrderSerializer, OrderItemSerializer,
    UserAddressSerializer, CafeOwnerSerializer, UserSerializer
)
import logging
import json
import time
import socket
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# Настраиваем логирование
logger = logging.getLogger(__name__)

@api_view(['GET', 'HEAD'])
@permission_classes([AllowAny])
def api_health_check(request):
    """
    Проверка здоровья API сервера.
    Возвращает базовую информацию о работоспособности API и связке с БД.
    """
    try:
        start_time = time.time()
        
        # Skip database checks for HEAD requests to be lightweight
        if request.method == 'HEAD':
            data = {
                "status": "ok",
                "timestamp": time.time(),
                "uptime": time.time() - start_time,
                "method": "HEAD"
            }
            return Response(data)
            
        # Проверяем соединение с БД
        db_ok = False
        db_error = None
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                db_ok = True
        except Exception as e:
            db_error = str(e)
        
        # Проверяем доступность модели City
        cities_count = -1
        cities_ok = False
        cities_error = None
        
        try:
            cities_count = City.objects.count()
            cities_ok = True
        except Exception as e:
            cities_error = str(e)
        
        # Подготавливаем ответ
        hostname = socket.gethostname()
        
        data = {
            "status": "ok" if db_ok and cities_ok else "error",
            "timestamp": time.time(),
            "uptime": time.time() - start_time,
            "hostname": hostname,
            "ip": socket.gethostbyname(hostname),
            "client_ip": request.META.get('REMOTE_ADDR', 'unknown'),
            "database": {
                "status": "connected" if db_ok else "error",
                "error": db_error
            },
            "cities_api": {
                "status": "ok" if cities_ok else "error",
                "count": cities_count,
                "error": cities_error
            }
        }
        
        logger.info(f"Health check запрос от {request.META.get('REMOTE_ADDR')}: {data['status']}")
        
        return Response(data)
    except Exception as e:
        # Always return a response even if there's an error
        logger.error(f"Error in health check: {str(e)}")
        return Response({
            "status": "error",
            "error": str(e),
            "timestamp": time.time()
        })


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Изменено - только аутент. пользователи могут изменять
    
    def list(self, request, *args, **kwargs):
        try:
            # Применяем пагинацию
            paginator = PageNumberPagination()
            paginated_queryset = paginator.paginate_queryset(self.get_queryset(), request)
            serializer = self.get_serializer(paginated_queryset, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            logger.error(f"Ошибка при получении списка городов: {str(e)}")
            return Response(
                {"error": "Ошибка при получении списка городов", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CafeViewSet(viewsets.ModelViewSet):
    queryset = Cafe.objects.all()
    serializer_class = CafeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Изменено - требуется авторизация для изменения
    
    def get_queryset(self):
        queryset = self.queryset
        city_id = self.request.query_params.get('city', None)
        
        if city_id is not None:
            try:
                city_id = int(city_id)
                queryset = queryset.filter(city=city_id)
            except (ValueError, TypeError):
                return Cafe.objects.none()
        return queryset
    
    def list(self, request, *args, **kwargs):
        try:
            paginator = PageNumberPagination()
            paginated_queryset = paginator.paginate_queryset(self.get_queryset(), request)
            serializer = self.get_serializer(paginated_queryset, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            logger.error(f"Ошибка при получении списка кафе: {str(e)}")
            return Response(
                {"error": "Ошибка при получении списка кафе", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def add_owner(self, request, pk=None):
        cafe = self.get_object()
        
        # Проверяем данные запроса
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        phone = request.data.get('phone', '')
        
        if not all([username, email, password]):
            return Response(
                {"error": "Необходимо указать имя пользователя, email и пароль"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Проверяем существует ли пользователь
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": f"Пользователь с именем {username} уже существует"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": f"Пользователь с email {email} уже существует"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Создаем нового пользователя
        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password),
            first_name=first_name,
            last_name=last_name
        )
        
        # Создаем связь с рестораном
        contact = CafeContact.objects.create(
            cafe=cafe,
            user=user,
            email=email,
            phone=phone,
            role='owner',
            is_primary=True
        )
        
        serializer = CafeOwnerSerializer(contact)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'])
    def owners(self, request, pk=None):
        cafe = self.get_object()
        owners = CafeContact.objects.filter(cafe=cafe, role='owner')
        serializer = CafeOwnerSerializer(owners, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def statistics(self, request, pk=None):
        cafe = self.get_object()
        
        # Общее количество заказов
        total_orders = Order.objects.filter(cafe=cafe).count()
        
        # Общая выручка
        total_revenue = Order.objects.filter(cafe=cafe).aggregate(
            revenue=Sum('total_price')
        )['revenue'] or 0
        
        # Средний чек
        average_order_value = Order.objects.filter(cafe=cafe).aggregate(
            avg_value=Avg('total_price')
        )['avg_value'] or 0
        
        # Самые популярные товары
        popular_items = OrderItem.objects.filter(
            order__cafe=cafe
        ).values(
            'menu_item'
        ).annotate(
            total=Count('menu_item')
        ).order_by('-total')[:5]
        
        # Получаем полную информацию о популярных товарах
        popular_items_data = []
        for item in popular_items:
            menu_item = MenuItem.objects.get(id=item['menu_item'])
            serializer = MenuItemSerializer(menu_item)
            popular_items_data.append(serializer.data)
        
        data = {
            'total_orders': total_orders,
            'total_revenue': total_revenue,
            'average_order_value': average_order_value,
            'popular_items': popular_items_data
        }
        
        return Response(data)


class CafeContactViewSet(viewsets.ModelViewSet):
    queryset = CafeContact.objects.all()
    serializer_class = CafeContactSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Изменено - требуется авторизация для изменения


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Изменено - требуется авторизация для изменения
    
    def get_queryset(self):
        queryset = self.queryset
        cafe_id = self.request.query_params.get('cafe', None)
        if cafe_id is not None:
            try:
                cafe_id = int(cafe_id)
                queryset = queryset.filter(cafe=cafe_id)
            except (ValueError, TypeError):
                return MenuItem.objects.none()
        
        # Добавляем фильтрацию по доступности, если параметр передан
        available = self.request.query_params.get('available', None)
        if available is not None:
            queryset = queryset.filter(available=(available.lower() == 'true'))
            
        return queryset
    
    def list(self, request, *args, **kwargs):
        try:
            paginator = PageNumberPagination()
            paginated_queryset = paginator.paginate_queryset(self.get_queryset(), request)
            serializer = self.get_serializer(paginated_queryset, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            logger.error(f"Ошибка при получении элементов меню: {str(e)}")
            return Response(
                {"error": "Ошибка при получении элементов меню", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]  # Только авторизованные пользователи
    
    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        
        # Если пользователь не администратор, возвращаем только его заказы
        if not user.is_staff:
            queryset = queryset.filter(user=user)
            
        cafe_id = self.request.query_params.get('cafe', None)
        if cafe_id is not None and cafe_id != 'undefined':
            try:
                cafe_id = int(cafe_id)
                queryset = queryset.filter(cafe=cafe_id)
            except (ValueError, TypeError):
                return Order.objects.none()
                
        return queryset
    
    def perform_create(self, serializer):
        # Устанавливаем текущего пользователя
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        try:
            order = self.get_object()
            status_value = request.data.get('status')
            
            if status_value not in dict(Order.ORDER_STATUS).keys():
                return Response(
                    {"error": f"Неправильный статус: {status_value}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            order.status = status_value
            order.save()
            
            serializer = self.get_serializer(order)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Ошибка при обновлении статуса заказа: {str(e)}")
            return Response(
                {"error": "Ошибка при обновлении статуса заказа", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]  # Только авторизованные пользователи
    
    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        
        # Если пользователь не администратор, показываем позиции только из его заказов
        if not user.is_staff:
            queryset = queryset.filter(order__user=user)
            
        order_id = self.request.query_params.get('order', None)
        if order_id is not None:
            queryset = queryset.filter(order=order_id)
            
        return queryset


class UserAddressViewSet(viewsets.ModelViewSet):
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer
    permission_classes = [IsAuthenticated]  # Только авторизованные пользователи
    
    def get_queryset(self):
        # Пользователь может видеть только свои адреса
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Устанавливаем текущего пользователя при создании адреса
        serializer.save(user=self.request.user)


# Новый ViewSet для управления владельцами ресторанов
class RestaurantOwnerViewSet(viewsets.ModelViewSet):
    queryset = CafeContact.objects.filter(role='owner')
    serializer_class = CafeOwnerSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Получить информацию о текущем владельце"""
        user = request.user
        try:
            owner_contact = CafeContact.objects.get(user=user, role='owner')
            serializer = self.get_serializer(owner_contact)
            return Response(serializer.data)
        except CafeContact.DoesNotExist:
            return Response(
                {"error": "Пользователь не является владельцем ресторана"},
                status=status.HTTP_404_NOT_FOUND
            )
