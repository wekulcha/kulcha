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
    class Meta:
        model = MenuItem
        fields = '__all__'


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
