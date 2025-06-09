import logging
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
from django.middleware.csrf import CsrfViewMiddleware

logger = logging.getLogger(__name__)

class ContentTypeMiddleware:
    """
    Middleware to ensure proper UTF-8 content-type headers for all API responses.
    """
    
    def __init__(self, get_response):
        self.get_response = get_response
        
    def __call__(self, request):
        response = self.get_response(request)
        
        # Only modify JSON responses
        content_type = response.get('Content-Type', '')
        if 'application/json' in content_type and 'charset' not in content_type:
            response['Content-Type'] = 'application/json; charset=utf-8'
            
        return response 

class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # Используем настройки из settings.py
        self.allowed_origins = getattr(settings, 'CORS_ALLOWED_ORIGINS', [
            'http://localhost', 'http://localhost:3000', 'http://localhost:80',
            'http://127.0.0.1', 'http://127.0.0.1:3000', 'http://127.0.0.1:80',
            'http://frontend'
        ])
        logger.info(f"CORS Middleware initialized with allowed origins: {self.allowed_origins}")

    def __call__(self, request):
        origin = request.headers.get('Origin', '')
        logger.debug(f"Request from origin: {origin}")
        
        # Для OPTIONS запросов отвечаем сразу с нужными заголовками
        if request.method == "OPTIONS":
            response = self.handle_options_request(request, origin)
            return response
        
        response = self.get_response(request)
        self.add_cors_headers(response, origin)
        return response
    
    def handle_options_request(self, request, origin):
        from django.http import HttpResponse
        response = HttpResponse()
        self.add_cors_headers(response, origin)
        return response
    
    def add_cors_headers(self, response, origin):
        """Добавление всех необходимых CORS заголовков"""
        # Set proper origin for CORS
        if origin in self.allowed_origins or '*' in self.allowed_origins:
            response["Access-Control-Allow-Origin"] = origin
        else:
            # Если origin не в списке разрешенных, используем первый разрешенный или *
            response["Access-Control-Allow-Origin"] = self.allowed_origins[0] if self.allowed_origins else "*"
        
        # Set other CORS headers
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With, Accept, X-CSRFToken"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
        response["Access-Control-Allow-Credentials"] = "true"
        response["Access-Control-Max-Age"] = "86400"  # 24 часа


class CustomCsrfMiddleware(CsrfViewMiddleware):
    """
    Кастомный CSRF middleware с дополнительным логированием и исключениями
    """
    def __init__(self, get_response):
        super().__init__(get_response)
        self.exempt_paths = getattr(settings, 'CSRF_EXEMPT_PATHS', [])
        logger.info(f"Custom CSRF Middleware initialized with exempt paths: {self.exempt_paths}")
    
    def process_view(self, request, callback, callback_args, callback_kwargs):
        path = request.path_info.lstrip('/')
        
        # Логирование для диагностики CSRF
        if 'auth' in path:
            logger.debug(f"CSRF Processing path: {path}, Method: {request.method}")
            logger.debug(f"CSRF token in cookie: {'csrftoken' in request.COOKIES}")
            logger.debug(f"CSRF token in header: {'HTTP_X_CSRFTOKEN' in request.META}")
            
            if 'csrftoken' in request.COOKIES:
                token = request.COOKIES['csrftoken']
                logger.debug(f"CSRF cookie token (first 6): {token[:6]}...")
            
            if 'HTTP_X_CSRFTOKEN' in request.META:
                token = request.META['HTTP_X_CSRFTOKEN']
                logger.debug(f"CSRF header token (first 6): {token[:6]}...")
        
        # Проверяем, есть ли путь в списке исключений
        for exempt_path in self.exempt_paths:
            if exempt_path in path:
                logger.debug(f"CSRF exempt path: {path}")
                return None
        
        return super().process_view(request, callback, callback_args, callback_kwargs) 