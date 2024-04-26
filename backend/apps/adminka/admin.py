from django.contrib import admin

from ..application.models import ApplicationStatus, Application


class ApplicationAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        if change:
            old_obj = self.model.objects.get(pk=obj.pk)
            if old_obj.status != obj.status:
                if (
                    old_obj.status != ApplicationStatus.NEW
                    and obj.status != ApplicationStatus.NEW
                ):
                    obj.status = old_obj.status
        else:
            if obj.status != ApplicationStatus.NEW:
                obj.status = ApplicationStatus.NEW
        obj.save()


admin.site.register(Application, ApplicationAdmin)
