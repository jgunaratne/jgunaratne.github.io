from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
from google.appengine.ext.db import Model
import logging
from entities import Badge
from entities import Skill
from entities import Mole
from entities import LastItem
# from entities import LastDisplayed
import os
from google.appengine.ext.webapp import template
import re
from google.appengine.api import channel

# def getLastDisplayed():
#   # get the display item
#   results = db.GqlQuery("SELECT * FROM LastDisplayed")
#   items = []
# 
#   for r in results:
#      items.append(m)
#   
#   if len(items) > 0:
#     pass
#   else:
#     # nothing displayed yet, nothing to display
#     return None
#   
#   return (items[0].type, items[0].name)
#     
#   # if items[0].name == "badges" or items[0].name == "skills" or items[0].name == "profile":
#   #   return name
#   # 
#   # if badgeName and (items[0].name == "badge_info":
#   #   badgeResults = db.GqlQuery("SELECT * FROM Badge WHERE name = :1", badgeName)
#   #   badges = []
#   #   for b in badgeResults:
#   #      badges.append(b)
#   #   if badges[0].name == badgeName):
#   #     return ("badgeInfo", badgeName)
#   
#   
#   
#   # return False
# 
# 
# def setLastDisplayed(t, n):
#   # get the display item
#   results = db.GqlQuery("SELECT * FROM LastDisplayed")
#   items = []
# 
#   for r in results:
#      items.append(m)
#   
#   # there's only ever one lastdisplayed item
#   if len(items) > 0:
#     items[0].type = t
#     items[0].name = n
#     items[0].put()
#   else:
#     # make the mole if necessary
#     rec = Mole(type=t, name=n)
#     rec.put()

class FirstSkill(webapp.RequestHandler):
  def get(self):
    
    cKey = '15' # could be anything here.. there's only 1 client
    
    # just could not get this to work
    # kept getting this error: AppIdAliasRequired 
    # https://developers.google.com/appengine/docs/python/channel/overview
    # set up channel
    # token = channel.create_channel("15", 90)
    # token = channel.create_channel(chan_name)
    # token = channel.create_channel(user.user_id() + game_key)
    
    # give them the first badge
    n = "Rookie"
    # get the badge item, make it visible
    queryResults = db.GqlQuery("SELECT * FROM Skill WHERE name = :1", n)
    
    queries = []
    
    for q in queryResults:
       queries.append(q)
    
    # there should only ever be 1
    if len(queries) > 0:
      queries[0].enabled = True
      queries[0].put()
    else:
      # uh oh
      self.response.out.write("did not enable name %s" % (n)) 
      return

    # get the lastitem (the thing displayed in the mole)
    queryResults2 = db.GqlQuery("SELECT * FROM LastItem")
    queries2 = []
    for q in queryResults2:
       queries2.append(q)

    if len(queries2) > 0:
      queries2[0].name = n
      queries2[0].color = queries[0].color
      queries2[0].icon = queries[0].icon
      queries2[0].type = 'skill'
      queries2[0].put()
    else:
      li = LastItem(name=n, color=queries[0].color, icon=queries[0].icon, type='skill')
      li.put()
    
    # self.response.out.write("I'm in skillsFirst") 
    # return
    # get all badge items
    queryResults = db.GqlQuery("SELECT * FROM Badge")
    
    badges = []
    earnedBadges = 0
    
    for q in queryResults:
       badges.append(q)
       if q.enabled is True:
         earnedBadges+=1

    bcount = len(badges)
    # if len(badges) == 0:
    #   return
    
    # color = "#B3AEC2"
    # if badges[0].enabled is True:
    #   color = badges[0].color
    
    # get all skills
    queryResults = db.GqlQuery("SELECT * FROM Skill")
    skills = []
    earnedSkills = 0
    for q in queryResults:
       skills.append(q)
       if q.enabled is True:
         earnedSkills+=1
       # self.response.out.write("appending skill %s, enabled %s color: %s" % (q.name, q.enabled, q.color)) 
    
    scount = len(skills)
       
    template_values = {
      'earnedBadges': earnedBadges,
      'earnedSkills': earnedSkills,
      'bcount': bcount,
      'scount': scount,
      'skills': skills,
      'token': cKey
    }
    

    # path = os.path.join(os.path.dirname(__file__), 'badge_info.html')
    path = os.path.join('', 'firstSkill.html')
    # self.response.out.write("file path: %s" % (path)) 
    # return
    self.response.out.write(template.render(path, template_values))

class SkillsPage(webapp.RequestHandler):
  def get(self):
    # self.response.out.write("I'm in skills") 
    # return
    # get all badge items
    queryResults = db.GqlQuery("SELECT * FROM Badge")
    
    badges = []
    earnedBadges = 0
    
    for q in queryResults:
       badges.append(q)
       if q.enabled is True:
         earnedBadges+=1

    bcount = len(badges)
    # if len(badges) == 0:
    #   return
    
    # color = "#B3AEC2"
    # if badges[0].enabled is True:
    #   color = badges[0].color
    
    # get all skills
    queryResults = db.GqlQuery("SELECT * FROM Skill")
    skills = []
    earnedSkills = 0
    for q in queryResults:
       skills.append(q)
       if q.enabled is True:
         earnedSkills+=1
       # self.response.out.write("appending skill %s, enabled %s color: %s" % (q.name, q.enabled, q.color)) 
    
    scount = len(skills)
       
    template_values = {
      'earnedBadges': earnedBadges,
      'earnedSkills': earnedSkills,
      'bcount': bcount,
      'scount': scount,
      'skills': skills
    }
    

    # path = os.path.join(os.path.dirname(__file__), 'badge_info.html')
    path = os.path.join('', 'skills.html')
    # self.response.out.write("file path: %s" % (path)) 
    # return
    self.response.out.write(template.render(path, template_values))
    
    

class BadgesPage(webapp.RequestHandler):
  def get(self):
    # self.response.out.write("I'm in badges") 
    # return
    
    # get all badge items
    queryResults = db.GqlQuery("SELECT * FROM Badge")
    
    badges = []
    earnedBadges = 0
    
    for q in queryResults:
       badges.append(q)
       if q.enabled is True:
         earnedBadges+=1

    bcount = len(badges)
    # if len(badges) == 0:
    #   return
    
    # color = "#B3AEC2"
    # if badges[0].enabled is True:
    #   color = badges[0].color
    
    # get all skills
    queryResults = db.GqlQuery("SELECT * FROM Skill")
    skills = []
    earnedSkills = 0
    for q in queryResults:
       skills.append(q)
       if q.enabled is True:
         earnedSkills+=1
       # self.response.out.write("appending skill %s, enabled %s color: %s" % (q.name, q.enabled, q.color)) 
    
    scount = len(skills)
       
    template_values = {
      'earnedBadges': earnedBadges,
      'earnedSkills': earnedSkills,
      'bcount': bcount,
      'scount': scount,
      'badges': badges,
      'skills': skills
    }
    

    # path = os.path.join(os.path.dirname(__file__), 'badge_info.html')
    path = os.path.join('', 'badges.html')
    # self.response.out.write("badge name %s, badge color %s file path: %s" % (badgename, color, path)) 
    # return
    self.response.out.write(template.render(path, template_values))

class ProfilePage(webapp.RequestHandler):
  def get(self):
    # self.response.out.write("I'm in profile") 
    # return
    # get all badge items
    queryResults = db.GqlQuery("SELECT * FROM Badge")
    # setLastDisplayed(t="profile")
    
    badges = []
    earnedBadges = 0
    
    for q in queryResults:
       badges.append(q)
       if q.enabled is True:
         earnedBadges+=1

    bcount = len(badges)
    # if len(badges) == 0:
    #   return
    
    # color = "#B3AEC2"
    # if badges[0].enabled is True:
    #   color = badges[0].color
    
    # get all skills
    queryResults = db.GqlQuery("SELECT * FROM Skill")
    skills = []
    earnedSkills = 0
    for q in queryResults:
       skills.append(q)
       if q.enabled is True:
         earnedSkills+=1
       # self.response.out.write("appending skill %s, enabled %s color: %s" % (q.name, q.enabled, q.color)) 
    
    scount = len(skills)
       
    template_values = {
      'earnedBadges': earnedBadges,
      'earnedSkills': earnedSkills,
      'bcount': bcount,
      'scount': scount,
      'badges': badges,
      'skills': skills
    }
    

    # path = os.path.join(os.path.dirname(__file__), 'badge_info.html')
    path = os.path.join('', 'profile.html')
    # self.response.out.write("badge name %s, badge color %s file path: %s" % (badgename, color, path)) 
    # return
    self.response.out.write(template.render(path, template_values))

class BadgeInfo(webapp.RequestHandler):
  def get(self, badgename):
    #  does this work? a la http://stackoverflow.com/questions/2360638/google-app-engine-give-arguments-to-a-script-from-url-handler
    #  if not, try http://stackoverflow.com/questions/1664230/passing-arguments-to-a-handler-in-app-yaml
    # self.response.out.write("badge name %s" % badgename)
    # 
    # return
    
    n = badgename
    # setLastDisplayed(t="badgeInfo", n=badgename)
    earnedBadges = 0
    earnedSkills = 0
    
    # escape...
    full = badgename
    n = full.replace("&lt", "<")
    n = n.replace("&gt", ">")
    n = n.replace("%20", " ")
    n = n.replace("%3C", "<")
    n = n.replace("%3E", ">")
    n = n.replace("%21", "!")
    # this has to be last:
    n = n.replace("&amp", "&")
      
    # get the badge item
    queryResults = db.GqlQuery("SELECT * FROM Badge WHERE name = :1", n)
    
    badges = []
    
    for q in queryResults:
       badges.append(q)

    # there should only ever be 1
    if len(badges) == 0:
      return
    
    color = "#B3AEC2"
    if badges[0].enabled is True:
      color = badges[0].color
      earnedBadges+=1
    
    # get the skills attached to the badge
    queryResults = db.GqlQuery("SELECT * FROM Skill WHERE badge = :1", n)
    skills = []
    for q in queryResults:
       skills.append(q)
       # self.response.out.write("appending skill %s, enabled %s color: %s" % (q.name, q.enabled, q.color)) 
    
    # get all skills for counts
    queryResults = db.GqlQuery("SELECT * FROM Skill")
    earnedSkills = 0
    for q in queryResults:
       if q.enabled is True:
         earnedSkills+=1
       
    template_values = {
      'badge': badges[0],
      'skills': skills,
      'earnedBadges': earnedBadges,
      'earnedSkills': earnedSkills
    }
    

    # path = os.path.join(os.path.dirname(__file__), 'badge_info.html')
    path = os.path.join('', 'badge_info.html')
    # self.response.out.write("badge name %s, badge color %s file path: %s" % (badgename, color, path)) 
    # return
    self.response.out.write(template.render(path, template_values))
    
    
class SkillInfo(webapp.RequestHandler):
  
  def get(self, skillname):
    #  does this work? a la http://stackoverflow.com/questions/2360638/google-app-engine-give-arguments-to-a-script-from-url-handler
    #  if not, try http://stackoverflow.com/questions/1664230/passing-arguments-to-a-handler-in-app-yaml
    # self.response.out.write("badge name %s" % badgename)
    # 
    # return
    
    # Note%20to%3Cbr/%3E%20Self
    # Note%20to<br/>%20Self
    
    # escape...
    full = skillname
    # setLastDisplayed(t="skillInfo", full)
    n = full.replace("&lt", "<")
    n = n.replace("&gt", ">")
    n = n.replace("%20", " ")
    n = n.replace("%3C", "<")
    n = n.replace("%3E", ">")
    n = n.replace("%21", "!")
    # this has to be last:
    n = n.replace("&amp", "&")
    
    # self.response.out.write("skill name %s" % (skillname, n)) 
    # return
           
    # get the skill item
    queryResults = db.GqlQuery("SELECT * FROM Skill WHERE name = :1", n)

    skills = []

    for q in queryResults:
       skills.append(q)

    # there should only ever be 1
    if len(skills) != 1:
          self.response.out.write("wrong skill number, len %i filename %s" % (len(skills), n)) 
          return
    skill = skills[0]
    
    # hint = skills[0].hint
    # icon = skills[0].icon
    # color = skills[0].color
    # enabled = skills[0].enabled
    
    # get counts
    # get all skills for counts
    queryResults = db.GqlQuery("SELECT * FROM Skill")
    earnedSkills = 0
    for q in queryResults:
       if q.enabled is True:
         earnedSkills+=1
    
    # get all skills for counts
    queryResults = db.GqlQuery("SELECT * FROM Badge")
    earnedBadges = 0
    for q in queryResults:
      if q.enabled is True:
        earnedBadges+=1

    template_values = {
      'skill': skill,
      'earnedBadges': earnedBadges,
      'earnedSkills': earnedSkills
    }


    # path = os.path.join(os.path.dirname(__file__), 'badge_info.html')
    path = os.path.join('', 'skill_info.html')
    # self.response.out.write("skill name %s, skill color %s file path: %s" % (n, color, path)) 
    # return
    self.response.out.write(template.render(path, template_values))
    
    import re, htmlentitydefs

  
    

class ActivateBadge(webapp.RequestHandler):
  def get(self):
    n = self.request.get('name')
    # get the badge item, make it visible
    queryResults = db.GqlQuery("SELECT * FROM Badge WHERE name = :1", n)
    
    queries = []
    
    for q in queryResults:
       queries.append(q)
    
    # there should only ever be 1
    if len(queries) > 0:
      queries[0].enabled = True
      queries[0].put()
    else:
      # uh oh
      pass
    
    
    # get the mole item, make it visible
    moleResults = db.GqlQuery("SELECT * FROM Mole")
    moles = []

    flag = bool(True)
    for m in moleResults:
       moles.append(m)

    # there's only ever one mole item
    if len(moles) > 0:
      moles[0].visible = flag
      moles[0].put()
    else:
      # make the mole if necessary
      rec = Mole(visible=flag)
      rec.put()

    # get the lastitem (the thing displayed in the mole)
    queryResults2 = db.GqlQuery("SELECT * FROM LastItem")
    queries2 = []
    for q in queryResults2:
       queries2.append(q)

    if len(queries2) > 0:
      queries2[0].name = n
      queries2[0].color = queries[0].color
      queries2[0].type = 'badge'
      queries2[0].put()
    else:
      li = LastItem(name=n, color=queries[0].color, type='badge')
      li.put()
    
    
    
class ActivateSkill(webapp.RequestHandler):
  def get(self):
    n = self.request.get('name')
    # get the badge item, make it visible
    queryResults = db.GqlQuery("SELECT * FROM Skill WHERE name = :1", n)
    
    queries = []
    
    for q in queryResults:
       queries.append(q)
    
    # there should only ever be 1
    if len(queries) > 0:
      queries[0].enabled = True
      queries[0].put()
    else:
      # uh oh
      self.response.out.write("did not enable name %s" % (n)) 
      return
     
    # get the mole item, make it visible
    moleResults = db.GqlQuery("SELECT * FROM Mole")
    moles = []

    flag = bool(True)
    for m in moleResults:
       moles.append(m)

    # there's only ever one mole item
    if len(moles) > 0:
      moles[0].visible = flag
      moles[0].put()
    else:
      # make the mole if necessary
      rec = Mole(visible=flag)
      rec.put()

    # get the lastitem (the thing displayed in the mole)
    queryResults2 = db.GqlQuery("SELECT * FROM LastItem")
    queries2 = []
    for q in queryResults2:
       queries2.append(q)

    if len(queries2) > 0:
      queries2[0].name = n
      queries2[0].color = queries[0].color
      queries2[0].icon = queries[0].icon
      queries2[0].type = 'skill'
      queries2[0].put()
    else:
      li = LastItem(name=n, color=queries[0].color, icon=queries[0].icon, type='skill')
      li.put()
      
    # notify client
    channel.send_message(15, '')
     


class AddBadge(webapp.RequestHandler):
  def get(self):
    
    n = self.request.get('name')
    c = self.request.get('color')
    e = bool(self.request.get('enabled'))
    s = self.request.get('skills')
    if not s:
      s = 0
    else:
      s = int(s)
    
      
    rec = Badge(name=n, color=c, enabled=e, skills=s)
    rec.put()
    
    # get the mole item, make it visible
    queryResults = db.GqlQuery("SELECT * FROM Mole")
    queries = []
    
    flag = bool(True)
    for q in queryResults:
       queries.append(q)
    
    # there's only ever one mole item
    if len(queries) > 0:
      queries[0].visible = flag
      queries[0].put()
    else:
      # make the mole if necessary
      rec = Mole(visible=flag)
      rec.put()
      
    # get the lastitem (the thing displayed in the mole)
    queryResults2 = db.GqlQuery("SELECT * FROM LastItem")
    queries2 = []
    for q in queryResults2:
       queries2.append(q)
    
    if len(queries2) > 0:
      queries2[0].name = n
      queries2[0].color = c
      queries2[0].type = 'badge'
      queries2[0].put()
    else:
      li = LastItem(name=n, color=c, type='badge')
      li.put()
      
    self.response.out.write("Added badge.")
    
    
class AddSkill(webapp.RequestHandler):
  def get(self):
    
    n = self.request.get('name')
    c = self.request.get('color')
    i = self.request.get('icon')
    e = self.request.get('enabled') # 535407 this number was just sitting here.. is it useful?
    rec = Skill(name=n, color=c, icon=i, enabled=e)
    rec.put()
    
    self.response.out.write("Added skill.")
    
    queryResults = db.GqlQuery("SELECT * FROM Mole")
    queries = []
    
    flag = bool(True)
    for q in queryResults:
       queries.append(q)

    if len(queries) > 0:
      queries[0].visible = flag
      queries[0].put()
    else:
      rec = Mole(visible=flag)
      rec.put()
      
    queryResults2 = db.GqlQuery("SELECT * FROM LastItem")
    queries2 = []
    for q in queryResults2:
       queries2.append(q)
    
    if len(queries2) > 0:
      queries2[0].name = n
      queries2[0].color = c
      queries2[0].icon = i
      queries2[0].type = 'skill'
      queries2[0].put()
    else:
      li = LastItem(name=n, color=c, icon=i, type='skill')
      li.put()



class Reset(webapp.RequestHandler):
  def get(self):
    # clear badges and skills, copied from Clear
    query = db.GqlQuery("SELECT * FROM Badge")
    items = []
    for q in query:
      items.append(q)


    query = db.GqlQuery("SELECT * FROM Skill")
    for q in query:
      items.append(q)

    db.delete(items)

    self.response.out.write("Reset: cleared")
    
    # now, add default 'blank' badges and skills
    # Badge(name, color, enabled, skills)
    # Skill(name, color, icon, enabled)
    # 99BB69, F5180C, 1106D6, F9FF47, D7B344
    Badge(name="Presenter", color="#99BB69", enabled=False, skills=3).put()
    Skill(name="Present With<br/>Notes", color="#809ba2", icon="present_with_notes", enabled=False, badge="Presenter", hint="Click the arrow on the 'Presentation' button near the top right of the screen and select 'with notes'").put()
    Skill(name="Speaker<br/>Notes", color="#f74476", icon="speaker_notes", enabled=False, badge="Presenter", hint="Enter speaker notes in the text area below any slide. You can view these notes while giving a presentation").put()
    Skill(name="Rookie", color="#c99700", icon="new_slide_hot", enabled=False, badge="Presenter", hint="Welcome to Google Presentations!").put()
    
    Badge(name="Speed Racer", color="#F5180C", enabled=False, skills=4).put()
    Skill(name="Comment", color="#99bb69", icon="comment_hot", enabled=False, badge="Speed Racer", hint="Add a comment using the hotkeys 'Ctrl + Alt + M'").put()
    Skill(name="Redo", color="#f74476", icon="redo_hot", enabled=False, badge="Speed Racer", hint="Redo using the hotkeys 'Ctrl + Y'").put()
    Skill(name="Undo", color="#c99700", icon="undo_hot", enabled=False, badge="Speed Racer", hint="Undo using the hotkeys 'Ctrl + Z'").put()
    Skill(name="New Slide", color="#809ba2", icon="new_slide_hot", enabled=False, badge="Speed Racer", hint="Create a new slide using the hotkeys 'Ctrl + M'").put()
    
    Badge(name="Artist", color="#c99700", enabled=False, skills=3).put()
    Skill(name="Insert<br/>Video", color="#80a1b5", icon="video", enabled=False, badge="Artist", hint="Add a video from the Insert menu").put()
    Skill(name="Insert<br/>Shape", color="#9dbb54", icon="transition", enabled=False, badge="Artist", hint="Add a shape from the Insert menu").put()
    Skill(name="Theme", color="#f74476", icon="movies", enabled=False, badge="Artist", hint="Change your presentation's theme in the Slide menu").put()
    
    Badge(name="Mystery Zone!", color="#000000", enabled=False, skills=2).put()
    Skill(name="Bullseye", color="#f74476", icon="align_shapes", enabled=False, badge="Mystery Zone!", hint="Make a perfect bullseye... <br/>Hint: align!").put()
    Skill(name="Time<br/>Traveler", color="#9891ac", icon="revision", enabled=False, badge="Mystery Zone!", hint="Use the File menu to go back in time... <br/>Hint: history!").put()


class Clear(webapp.RequestHandler):
  def get(self):
    query = db.GqlQuery("SELECT * FROM Badge")
    items = []
    for q in query:
      items.append(q)
   
    
    query = db.GqlQuery("SELECT * FROM Skill")
    for q in query:
      items.append(q)
    
    db.delete(items)
    
    self.response.out.write("Cleared")  
  
class Badges(webapp.RequestHandler):
  def get(self):
    
    self.response.headers['Content-Type'] = 'text/plain'
    # setLastDisplayed(t="badges")
    
    queryResults = db.GqlQuery("SELECT * FROM Badge")
    queries = []
    for q in queryResults:
       queries.append(q.toDict())
    self.response.out.write(queries)


class Skills(webapp.RequestHandler):
  def get(self):    
    self.response.headers['Content-Type'] = 'text/plain'
    # setLastDisplayed(t="skills")

    queryResults = db.GqlQuery("SELECT * FROM Skill")
    queries = []
    for q in queryResults:
       queries.append(q.toDict())
    self.response.out.write(queries)
    
class SetMole(webapp.RequestHandler):
  def get(self):
    
    self.response.headers['Content-Type'] = 'text/plain'
    flag = bool(False)
    
    f = self.request.get('visible')
    if f == 'true':
      flag = bool(True)

    queryResults = db.GqlQuery("SELECT * FROM Mole")
    queries = []
    
    for q in queryResults:
       queries.append(q)

    if len(queries) > 0:
      queries[0].visible = flag
      queries[0].put()
    else:
      rec = Mole(visible=flag)
      rec.put()

    self.response.out.write(str(flag))
      
      
class MoleJS(webapp.RequestHandler):
  def get(self):
    
    self.response.headers['Content-Type'] = 'text/plain'
    
    queryResults = db.GqlQuery("SELECT * FROM Mole")
    queries = []
    
    for q in queryResults:
       queries.append(q)
       
    flag = str(queries[0].visible).lower();
    file = open('mole.js').read()
    
    self.response.out.write('showMole = ' + flag + ';\n')
    self.response.out.write(file)
    
class GetLastItem(webapp.RequestHandler):
  def get(self):
    
    self.response.headers['Content-Type'] = 'text/plain'
    
    queryResults = db.GqlQuery("SELECT * FROM LastItem")
    queries = []
    for q in queryResults:
       queries.append(q.toDict())
    self.response.out.write(queries)
    

application = webapp.WSGIApplication([('/firstSkill.html', FirstSkill), ('/skills.html', SkillsPage), ('/badges.html', BadgesPage), ('/profile.html', ProfilePage), ('/skill_info/(.*)', SkillInfo), ('/badge_info/(.*)', BadgeInfo), ('/lastitem', GetLastItem), ('/mole.js', MoleJS), ('/setmole', SetMole), ('/addbadge', AddBadge), ('/addskill', AddSkill), ('/activateSkill', ActivateSkill), ('/activateBadge', ActivateBadge), ('/reset', Reset), ('/clear', Clear), ('/badges', Badges), ('/skills', Skills)], debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
