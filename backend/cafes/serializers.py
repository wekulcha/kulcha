from rest_framework import serializers
from .models import City, Cafe, CafeContact, MenuItem, Order, OrderItem, UserAddress
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'


class CafeSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)
    city_id = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(),
        source='city',
        write_only=True
    )

    class Meta:
        model = Cafe
        fields = '__all__'


class CafeContactSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='user',
        write_only=True,
        required=False
    )
    cafe = CafeSerializer(read_only=True)
    cafe_id = serializers.PrimaryKeyRelatedField(
        queryset=Cafe.objects.all(),
        source='cafe',
        write_only=True
    )
    role_display = serializers.CharField(source='get_role_display', read_only=True)

    class Meta:
        model = CafeContact
        fields = '__all__'


class CafeOwnerSerializer(serializers.ModelSerializer):
    """Сериализатор для владельцев ресторанов с расширенной информацией"""
    user = UserSerializer(read_only=True)
    cafe = CafeSerializer(source='cafe', read_only=True)
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    
    class Meta:
        model = CafeContact
        fields = ('id', 'user', 'cafe', 'phone', 'email', 'role', 'role_display', 'is_primary')


class MenuItemSerializer(serializers.ModelSerializer):
    image_full_url = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = MenuItem
        fields = '__all__'
    
    def get_image(self, obj):
        """
        Возвращает очищенный URL изображения
        """
        if not obj.image:
            return None
        
        # Получаем оригинальный URL изображения
        original_url = obj.image.url
        
        # Возвращаем полный URL с портом 8000
        if original_url.startswith('/'):
            return f"http://localhost:8000{original_url}"
        else:
            return f"http://localhost:8000/{original_url}"
    
    def get_image_full_url(self, obj):
        """
        Возвращает полный URL изображения с корректным хостом и портом
        """
        if not obj.image:
            return None
        
        # Всегда используем порт 8000 для доступа к медиа-файлам в Docker
        image_path = str(obj.image.url)
        if image_path.startswith('/'):
            image_path = image_path[1:]
        
        # Явно указываем порт 8000 для localhost
        return f"http://localhost:8000/{image_path}"


class UserAddressSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)
    city_id = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(),
        source='city',
        write_only=True
    )

    class Meta:
        model = UserAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer(read_only=True)
    menu_item_id = serializers.PrimaryKeyRelatedField(
        queryset=MenuItem.objects.all(),
        source='menu_item',
        write_only=True
    )

    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    user = serializers.StringRelatedField(read_only=True)
    delivery_address = UserAddressSerializer(read_only=True)
    delivery_address_id = serializers.PrimaryKeyRelatedField(
        queryset=UserAddress.objects.all(),
        source='delivery_address',
        write_only=True,
        required=False
    )

    class Meta:
        model = Order
        fields = '__all__'
