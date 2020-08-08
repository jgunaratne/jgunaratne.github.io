#!/usr/bin/env python
from google.appengine.ext import db

class LastDisplayed(db.Model):
  name = db.StringProperty()
  def toDict(self):
      return {
           'type': str(self.type),
           'name': str(self.name)
         }

class Badge(db.Model):
  name = db.StringProperty()
  color = db.StringProperty()
  enabled = db.BooleanProperty(False)
  skills = db.IntegerProperty(10)
  def toDict(self):
    return {
         'name': str(self.name),
         'color': str(self.color),
         'enabled': str(self.enabled),
         'skills': str(self.skills)
       }

class Skill(db.Model):
  name = db.StringProperty()
  color = db.StringProperty()
  icon = db.StringProperty()
  enabled = db.BooleanProperty()
  badge = db.StringProperty()
  hint = db.StringProperty()
  def toDict(self):
      return {
           'name': str(self.name),
           'color': str(self.color),
           'icon': str(self.icon),
           'enabled': str(self.enabled),
           'badge': str(self.badge),
           'hint': str(self.hint)
         }

class Mole(db.Model):
  visible = db.BooleanProperty()
  
  
class LastItem(db.Model):
  name = db.StringProperty()
  color = db.StringProperty()
  icon = db.StringProperty()
  type = db.StringProperty()
  def toDict(self):
      return {
           'name': str(self.name),
           'color': str(self.color),
           'icon': str(self.icon),
           'type': str(self.type)
         }