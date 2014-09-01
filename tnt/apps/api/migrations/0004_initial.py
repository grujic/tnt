# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Calculation'
        db.create_table(u'api_calculation', (
            ('id', self.gf('django.db.models.fields.CharField')(max_length=100, primary_key=True)),
            ('user_id', self.gf('django.db.models.fields.IntegerField')()),
            ('time_created', self.gf('django.db.models.fields.DateTimeField')(null=True)),
            ('time_run', self.gf('django.db.models.fields.DateTimeField')(null=True)),
            ('status', self.gf('django.db.models.fields.TextField')(default='saved')),
            ('setup', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal(u'api', ['Calculation'])


    def backwards(self, orm):
        # Deleting model 'Calculation'
        db.delete_table(u'api_calculation')


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