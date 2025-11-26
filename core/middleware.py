"""
============================================
DJANPAY - MIDDLEWARE DE SÉCURITÉ
Headers de sécurité HTTP
============================================
"""


class SecurityHeadersMiddleware:
    """
    Middleware qui ajoute les headers de sécurité HTTP requis

    Headers ajoutés :
    - X-Content-Type-Options: nosniff
    - X-Frame-Options: DENY
    - X-XSS-Protection: 1; mode=block
    - Strict-Transport-Security: max-age=31536000; includeSubDomains (si HTTPS)
    - Referrer-Policy: strict-origin-when-cross-origin
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # X-Content-Type-Options: Empêche le navigateur de deviner le type MIME
        response['X-Content-Type-Options'] = 'nosniff'

        # X-Frame-Options: Empêche l'affichage du site dans une iframe (Clickjacking)
        response['X-Frame-Options'] = 'DENY'

        # X-XSS-Protection: Active la protection XSS du navigateur (legacy mais utile)
        response['X-XSS-Protection'] = '1; mode=block'

        # Referrer-Policy: Contrôle les informations envoyées dans le header Referer
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'

        # Strict-Transport-Security: Force HTTPS (uniquement si la requête est en HTTPS)
        if request.is_secure():
            response['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'

        # Permissions-Policy: Désactive les fonctionnalités inutiles
        response['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'

        return response
