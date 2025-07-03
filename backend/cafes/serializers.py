from rest_framework import serializers
from .models import City, Cafe, CafeContact, MenuItem, Order, OrderItem, UserAddress
from django.contrib.auth.models import User
import logging


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
    image = serializers.ImageField(required=False, allow_null=True)
    
    class Meta:
        model = MenuItem
        fields = '__all__'
    
    def get_image(self, obj):
        """
        Возвращает очищенный URL изображения
        """
        logger = logging.getLogger(__name__)
        logger.info(f"get_image called for {obj.name}, image field: {obj.image}")
        
        if not obj.image:
            logger.info(f"{obj.name}: image field is empty")
            return None
        
        # Получаем оригинальный URL изображения
        try:
            original_url = obj.image.url
            logger.info(f"{obj.name}: image URL is {original_url}")
            
            # Возвращаем полный URL с портом 8000
            if original_url.startswith('/'):
                result = f"http://localhost:8000{original_url}"
                logger.info(f"{obj.name}: returning {result}")
                return result
            else:
                result = f"http://localhost:8000/{original_url}"
                logger.info(f"{obj.name}: returning {result}")
                return result
        except Exception as e:
            logger.error(f"Error getting image URL for {obj.name}: {e}")
            return None
    
    def get_image_full_url(self, obj):
        """
        Возвращает полный URL изображения с корректным хостом и портом
        """
        logger = logging.getLogger(__name__)
        logger.info(f"get_image_full_url called for {obj.name}, image field: {obj.image}")
        
        if not obj.image:
            logger.info(f"{obj.name}: image field is empty for image_full_url")
            return None
        
        try:
            # Всегда используем порт 8000 для доступа к медиа-файлам в Docker
            image_path = str(obj.image.url)
            logger.info(f"{obj.name}: image path is {image_path}")
            
            if image_path.startswith('/'):
                image_path = image_path[1:]
            
            # Явно указываем порт 8000 для localhost
            result = f"http://localhost:8000/{image_path}"
            logger.info(f"{obj.name}: returning full URL {result}")
            return result
        except Exception as e:
            logger.error(f"Error getting image_full_url for {obj.name}: {e}")
            return None
            
    def create(self, validated_data):
        logger = logging.getLogger(__name__)
        logger.info(f"Creating menu item with data: {validated_data}")
        
        # Explicitly log image field
        if 'image' in validated_data:
            logger.info(f"Image found in validated_data: {validated_data['image']}")
        else:
            logger.info("No image in validated_data")
            
        instance = super().create(validated_data)
        logger.info(f"Created instance: {instance.id}, image: {instance.image}")
        return instance
        
    def update(self, instance, validated_data):
        logger = logging.getLogger(__name__)
        logger.info(f"Updating menu item {instance.id} with data: {validated_data}")
        
        # Explicitly log image field
        if 'image' in validated_data:
            logger.info(f"Image found in validated_data: {validated_data['image']}")
        else:
            logger.info("No image in validated_data")
            
        instance = super().update(instance, validated_data)
        logger.info(f"Updated instance: {instance.id}, image: {instance.image}")
        return instance


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
    customer_name = serializers.CharField(write_only=True, required=False)
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
        extra_kwargs = {
            'user': {'required': False},
        }
