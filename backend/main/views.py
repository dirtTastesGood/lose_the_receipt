from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import urls

@api_view(['GET'])
def api_home(request):
    api_urls = {
        'urls': []
    }
    
    for url in urls.urlpatterns:
        # add all api paths to a dictionary
        if 'api/' in str(url.pattern):
            api_urls['urls'].append(str(url.pattern))

    return Response(data=api_urls)
