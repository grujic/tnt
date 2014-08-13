# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Calculation.time_run'
        db.add_column(u'api_calculation', 'time_run',
                      self.gf('django.db.models.fields.DateTimeField')(null=True),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Calculation.time_run'
        db.delete_column(u'api_calculation', 'time_run')


    models = {
        u'api.calculation': {
            'Meta': {'object_name': 'Calculation'},
            'id': ('django.db.models.fields.CharField', [], {'max_length': '100', 'primary_key': 'True'}),
            'setup': ('django.db.models.fields.TextField', [], {}),
            'status': ('django.db.models.fields.TextField', [], {'default': "'saved'"}),
            'time_created': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'time_run': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'user_id': ('django.db.models.fields.IntegerField', [], {})
        }
    }

    complete_apps = ['api']