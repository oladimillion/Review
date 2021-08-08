from rest_framework import viewsets, response, status

class BaseModelViewSet(viewsets.ModelViewSet):

    class Meta:
        abstract = True

    def perform_update(self, serializer):
        self.pre_save(serializer)
        kwargs = self.get_extra_options()
        serializer.save(**kwargs)
        self.post_save(serializer)

    def perform_create(self, serializer):
        self.pre_save(serializer)
        kwargs = self.get_extra_options()
        serializer.save(**kwargs)
        self.post_save(serializer)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        data = self.get_data(serializer.data)
        return response.Response(data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        data = self.get_data(serializer.data)
        return response.Response(data)

    def pre_save(self, serializer):
        pass

    def post_save(self, serializer):
        pass

    def get_extra_options(self):
        return {}

    def do_nothing(self, data={}):
        return response.Response(data)

    def get_data(self, data={}):
        return data



