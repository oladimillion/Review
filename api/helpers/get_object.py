def get_object(Model, *arg, **kwargs):
    return Model.objects.filter(*arg, **kwargs).first()
