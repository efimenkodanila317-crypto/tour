(function(){
    var script = {
 "horizontalAlign": "left",
 "children": [
  "this.MainViewer",
  "this.Container_E84C951D_C791_0CA6_41D1_DE04E519BEAE",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.Container_7D70F4C0_70C3_6C98_41C2_140FAE67A7C0",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
  "this.Container_D77CA24A_EC3A_C529_41E2_B897B2B1A320"
 ],
 "id": "rootPlayer",
 "scrollBarMargin": 2,
 "width": "100%",
 "buttonToggleFullscreen": "this.Button_7D7704C0_70C3_6C98_41D2_5E329D40B716",
 "start": "this.init(); this.syncPlaylists([this.ThumbnailGrid_D77C924A_EC3A_C529_41D6_845B788BE44A_playlist,this.mainPlayList]); this.playList_615CD8E0_7145_A499_41C6_E4523818B1C3.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.Button_7D7704C0_70C3_6C98_41D2_5E329D40B716].forEach(function(component) { component.set('visible', false); }) }",
 "contentOpaque": false,
 "defaultVRPointer": "laser",
 "class": "Player",
 "scripts": {
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "registerKey": function(key, value){  window[key] = value; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "existsKey": function(key){  return key in window; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getKey": function(key){  return window[key]; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "unregisterKey": function(key){  delete window[key]; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); }
 },
 "downloadEnabled": false,
 "minHeight": 20,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 20,
 "layout": "absolute",
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "definitions": [{
 "thumbnailUrl": "media/photo_CBC1B58B_D24C_28CF_41E7_46AF6E41183C_t.jpg",
 "id": "photo_CBC1B58B_D24C_28CF_41E7_46AF6E41183C",
 "width": 4000,
 "image": {
  "levels": [
   {
    "url": "media/photo_CBC1B58B_D24C_28CF_41E7_46AF6E41183C.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "label": "02-Cucina",
 "class": "Photo",
 "duration": 5000,
 "height": 3726
},
{
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/f/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/u/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/r/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/b/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/d/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/l/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "CAMERA",
 "hfovMin": "120%",
 "id": "panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E",
 "class": "Panorama",
 "overlays": [
  "this.overlay_F43BAE32_D244_3BD9_41D8_601B1EFC51B5"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": -153.84,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_C5853522_D1C4_69F9_41C6_60221311EBE0",
   "backwardYaw": -40.38
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "vfov": 180,
 "thumbnailUrl": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_094B4823_05ED_C9F9_4190_590188D12132",
   "x": 724.29,
   "angle": -55.1,
   "y": 487.41,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMax": 130
},
{
 "viewerArea": "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9CPhotoAlbumPlayer",
 "class": "PhotoAlbumPlayer",
 "buttonNext": "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "buttonPrevious": "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482"
},
{
 "items": [
  {
   "media": "this.panorama_C5853522_D1C4_69F9_41C6_60221311EBE0",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_D77C924A_EC3A_C529_41D6_845B788BE44A_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_camera"
  },
  {
   "media": "this.panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_D77C924A_EC3A_C529_41D6_845B788BE44A_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_camera"
  },
  {
   "media": "this.panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_D77C924A_EC3A_C529_41D6_845B788BE44A_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_camera"
  },
  {
   "media": "this.panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_D77C924A_EC3A_C529_41D6_845B788BE44A_playlist, 3, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_camera"
  }
 ],
 "id": "ThumbnailGrid_D77C924A_EC3A_C529_41D6_845B788BE44A_playlist",
 "class": "PlayList"
},
{
 "id": "camera_61A2B946_7145_A599_4159_D80304D8FB47",
 "initialPosition": {
  "yaw": -45.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "thumbnailUrl": "media/photo_C88D987D_D244_184B_41EA_169C7B75AE6D_t.jpg",
 "id": "photo_C88D987D_D244_184B_41EA_169C7B75AE6D",
 "width": 2500,
 "image": {
  "levels": [
   {
    "url": "media/photo_C88D987D_D244_184B_41EA_169C7B75AE6D.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "label": "Esterno 1",
 "class": "Photo",
 "duration": 5000,
 "height": 2500
},
{
 "viewerArea": "this.MainViewer",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "id": "MainViewerPanoramaPlayer",
 "displayPlaybackBar": true,
 "mouseControlMode": "drag_rotation"
},
{
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/f/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/u/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/r/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/b/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/d/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/l/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "CAMERA 2",
 "hfovMin": "120%",
 "id": "panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0",
 "class": "Panorama",
 "overlays": [
  "this.overlay_C6F83E08_D1C4_FBC9_41DD_E97355DA227F"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": 160.26,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B",
   "backwardYaw": -129
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "vfov": 180,
 "thumbnailUrl": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_094B4823_05ED_C9F9_4190_590188D12132",
   "x": 1526.18,
   "angle": 69.25,
   "y": 399.2,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMax": 130
},
{
 "id": "camera_61877927_7145_A5E7_41C3_BF91C2829E4B",
 "initialPosition": {
  "yaw": 51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "id": "camera_6191D937_7145_A5E7_41A2_3B343348F55C",
 "initialPosition": {
  "yaw": -19.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "thumbnailUrl": "media/photo_CB799672_D24C_2859_41C9_6DAF53C87F96_t.jpg",
 "id": "photo_CB799672_D24C_2859_41C9_6DAF53C87F96",
 "width": 4000,
 "image": {
  "levels": [
   {
    "url": "media/photo_CB799672_D24C_2859_41C9_6DAF53C87F96.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "label": "01-Cucina",
 "class": "Photo",
 "duration": 5000,
 "height": 2430
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_0803C762_05ED_467B_4191_0B2ECE6162FD",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_615CD8E0_7145_A499_41C6_E4523818B1C3",
 "class": "PlayList"
},
{
 "thumbnailUrl": "media/photo_CAD51DDC_D244_1849_41CE_79EFA9C77B62_t.jpg",
 "id": "photo_CAD51DDC_D244_1849_41CE_79EFA9C77B62",
 "width": 2500,
 "image": {
  "levels": [
   {
    "url": "media/photo_CAD51DDC_D244_1849_41CE_79EFA9C77B62.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "label": "Esterno 3",
 "class": "Photo",
 "duration": 5000,
 "height": 2500
},
{
 "thumbnailUrl": "media/photo_C5C39AED_D244_184B_41C6_600529002A2B_t.jpg",
 "id": "photo_C5C39AED_D244_184B_41C6_600529002A2B",
 "width": 2500,
 "image": {
  "levels": [
   {
    "url": "media/photo_C5C39AED_D244_184B_41C6_600529002A2B.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "label": "Esterno 2",
 "class": "Photo",
 "duration": 5000,
 "height": 2500
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_094B4823_05ED_C9F9_4190_590188D12132",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_615C88E0_7145_A499_41A5_DD88B40748CB",
 "class": "PlayList"
},
{
 "id": "camera_61704907_7145_A5A7_41DB_266342860D17",
 "initialPosition": {
  "yaw": 26.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "thumbnailUrl": "media/photo_C8F5A988_D24C_38C9_41CF_7B49A1F79820_t.jpg",
 "id": "photo_C8F5A988_D24C_38C9_41CF_7B49A1F79820",
 "width": 4000,
 "image": {
  "levels": [
   {
    "url": "media/photo_C8F5A988_D24C_38C9_41CF_7B49A1F79820.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "label": "01-Living",
 "class": "Photo",
 "duration": 5000,
 "height": 2430
},
{
 "id": "panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_camera",
 "initialPosition": {
  "yaw": -7.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0.69
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "thumbnailUrl": "media/album_D1FE7BC1_C691_1B9E_41D2_18075FA50A31_t.png",
 "id": "album_D1FE7BC1_C691_1B9E_41D2_18075FA50A31",
 "label": "Foto",
 "class": "PhotoAlbum",
 "playList": "this.album_D1FE7BC1_C691_1B9E_41D2_18075FA50A31_AlbumPlayList"
},
{
 "items": [
  "this.PanoramaPlayListItem_615C18E0_7145_A499_41DA_28AEE9B49ED4",
  "this.PanoramaPlayListItem_616388E1_7145_A49B_41B1_EF3441517E6E",
  "this.PanoramaPlayListItem_616358E1_7145_A49B_41BC_859A438DEB28",
  "this.PanoramaPlayListItem_616328E1_7145_A49B_41D9_001D8984C9C3",
  {
   "media": "this.album_D1FE7BC1_C691_1B9E_41D2_18075FA50A31",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 0)",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "id": "panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "thumbnailUrl": "media/photo_C83A206C_D244_2849_41E9_3F529EA892A7_t.jpg",
 "id": "photo_C83A206C_D244_2849_41E9_3F529EA892A7",
 "width": 2500,
 "image": {
  "levels": [
   {
    "url": "media/photo_C83A206C_D244_2849_41E9_3F529EA892A7.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "label": "Esterno 4",
 "class": "Photo",
 "duration": 5000,
 "height": 2500
},
{
 "id": "camera_616E98F8_7145_A469_41DB_AFFE3393BB6C",
 "initialPosition": {
  "yaw": 139.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialZoomFactor": 1,
 "fieldOfViewOverlayRadiusScale": 0.14,
 "id": "map_094B4823_05ED_C9F9_4190_590188D12132",
 "width": 2000,
 "image": {
  "levels": [
   {
    "url": "media/map_094B4823_05ED_C9F9_4190_590188D12132.png",
    "width": 2000,
    "class": "ImageResourceLevel",
    "height": 1362
   },
   {
    "url": "media/map_094B4823_05ED_C9F9_4190_590188D12132_lq.png",
    "width": 310,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 212
   }
  ],
  "class": "ImageResource"
 },
 "overlays": [
  "this.overlay_0805417C_05ED_5A4F_4192_3B504840BD11",
  "this.overlay_08B68612_05ED_39DB_4195_4995E530FEF6"
 ],
 "fieldOfViewOverlayInsideColor": "#009900",
 "label": "Zona Notte",
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "thumbnailUrl": "media/map_094B4823_05ED_C9F9_4190_590188D12132_t.png",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "maximumZoomFactor": 1.2,
 "height": 1362
},
{
 "items": [
  {
   "begin": "this.loopAlbum(this.playList_614F28DB_7145_A4AF_41A9_5817583DF6D1, 0)",
   "media": "this.album_D1FE7BC1_C691_1B9E_41D2_18075FA50A31",
   "class": "PhotoAlbumPlayListItem",
   "player": "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9CPhotoAlbumPlayer"
  }
 ],
 "id": "playList_614F28DB_7145_A4AF_41A9_5817583DF6D1",
 "class": "PlayList"
},
{
 "thumbnailUrl": "media/photo_C88E8CC1_D24C_38BB_41BB_207813441F0A_t.jpg",
 "id": "photo_C88E8CC1_D24C_38BB_41BB_207813441F0A",
 "width": 3512,
 "image": {
  "levels": [
   {
    "url": "media/photo_C88E8CC1_D24C_38BB_41BB_207813441F0A.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "label": "02-Bagno",
 "class": "Photo",
 "duration": 5000,
 "height": 4000
},
{
 "id": "panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_camera",
 "initialPosition": {
  "yaw": -31.8,
  "class": "PanoramaCameraPosition",
  "pitch": -3.24
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_0803C762_05ED_467B_4191_0B2ECE6162FD",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_615CF8E0_7145_A499_41CC_125549560CC7",
 "class": "PlayList"
},
{
 "id": "camera_617F9916_7145_A5B9_41CA_88C637F30FB7",
 "initialPosition": {
  "yaw": -83.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "thumbnailUrl": "media/photo_CA2F431E_D24C_29C9_41D3_E5D06530EB54_t.jpg",
 "id": "photo_CA2F431E_D24C_29C9_41D3_E5D06530EB54",
 "width": 4000,
 "image": {
  "levels": [
   {
    "url": "media/photo_CA2F431E_D24C_29C9_41D3_E5D06530EB54.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "label": "01-Camera",
 "class": "Photo",
 "duration": 5000,
 "height": 2668
},
{
 "thumbnailUrl": "media/photo_C800BC76_D24C_1859_41E9_B25EDC97ABEE_t.jpg",
 "id": "photo_C800BC76_D24C_1859_41E9_B25EDC97ABEE",
 "width": 4000,
 "image": {
  "levels": [
   {
    "url": "media/photo_C800BC76_D24C_1859_41E9_B25EDC97ABEE.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "label": "01-Bagno",
 "class": "Photo",
 "duration": 5000,
 "height": 4142
},
{
 "thumbnailUrl": "media/photo_CBE4D27E_D24C_2849_41D3_C672F0DFAF3C_t.jpg",
 "id": "photo_CBE4D27E_D24C_2849_41D3_C672F0DFAF3C",
 "width": 4000,
 "image": {
  "levels": [
   {
    "url": "media/photo_CBE4D27E_D24C_2849_41D3_C672F0DFAF3C.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "label": "02-Camera",
 "class": "Photo",
 "duration": 5000,
 "height": 2666
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_094B4823_05ED_C9F9_4190_590188D12132",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_615CE8E0_7145_A499_41CA_D70BF8BD54F1",
 "class": "PlayList"
},
{
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/f/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/u/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/r/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/b/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/d/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/l/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "LIVING",
 "hfovMin": "120%",
 "id": "panorama_C5853522_D1C4_69F9_41C6_60221311EBE0",
 "class": "Panorama",
 "overlays": [
  "this.overlay_F8A9C857_D244_3847_41E2_BD52B1A0CC26",
  "this.overlay_CE492709_EDC5_4B2B_41D3_ECFA9D21F546"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": -40.38,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E",
   "backwardYaw": -153.84
  },
  {
   "yaw": 134.85,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B",
   "backwardYaw": 96.47
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "vfov": 180,
 "thumbnailUrl": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0803C762_05ED_467B_4191_0B2ECE6162FD",
   "x": 242.74,
   "angle": 102.31,
   "y": 905.92,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMax": 130
},
{
 "initialZoomFactor": 1,
 "fieldOfViewOverlayRadiusScale": 0.14,
 "id": "map_0803C762_05ED_467B_4191_0B2ECE6162FD",
 "width": 2000,
 "image": {
  "levels": [
   {
    "url": "media/map_0803C762_05ED_467B_4191_0B2ECE6162FD.png",
    "width": 2000,
    "class": "ImageResourceLevel",
    "height": 1362
   },
   {
    "url": "media/map_0803C762_05ED_467B_4191_0B2ECE6162FD_lq.png",
    "width": 310,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 212
   }
  ],
  "class": "ImageResource"
 },
 "overlays": [
  "this.overlay_08C9EDBD_05EF_CAC9_4168_066192E61566",
  "this.overlay_092E97FC_05EE_C64F_4169_29B136774246"
 ],
 "fieldOfViewOverlayInsideColor": "#009900",
 "label": "Zona Giorno",
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "thumbnailUrl": "media/map_0803C762_05ED_467B_4191_0B2ECE6162FD_t.png",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "maximumZoomFactor": 1.2,
 "height": 1362
},
{
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPhotoAlbumPlayer",
 "class": "PhotoAlbumPlayer",
 "buttonNext": "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "buttonPrevious": "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482"
},
{
 "id": "panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_camera",
 "initialPosition": {
  "yaw": -0.93,
  "class": "PanoramaCameraPosition",
  "pitch": -5.44
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/f/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/u/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/r/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/b/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/d/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/l/0/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "LIVING 2",
 "hfovMin": "120%",
 "id": "panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B",
 "class": "Panorama",
 "overlays": [
  "this.overlay_F8F54524_D244_69F9_41E1_4A45C95970D3",
  "this.overlay_CD0BAA06_EDC5_4519_41C0_1E2BA3AF2D86"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": -129,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0",
   "backwardYaw": 160.26
  },
  {
   "yaw": 96.47,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_C5853522_D1C4_69F9_41C6_60221311EBE0",
   "backwardYaw": 134.85
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "vfov": 180,
 "thumbnailUrl": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0803C762_05ED_467B_4191_0B2ECE6162FD",
   "x": 1266.96,
   "angle": 48.62,
   "y": 626.99,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMax": 130
},
{
 "movementMode": "constrained",
 "viewerArea": "this.MapViewer",
 "id": "MapViewerMapPlayer",
 "class": "MapPlayer"
},
{
 "thumbnailUrl": "media/photo_CAD85B6E_D24C_1849_41C5_19D0275E47F3_t.jpg",
 "id": "photo_CAD85B6E_D24C_1849_41C5_19D0275E47F3",
 "width": 4000,
 "image": {
  "levels": [
   {
    "url": "media/photo_CAD85B6E_D24C_1849_41C5_19D0275E47F3.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "label": "02-Living",
 "class": "Photo",
 "duration": 5000,
 "height": 2732
},
{
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "toolTipFontSize": 13,
 "id": "MainViewer",
 "left": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "toolTipPaddingBottom": 7,
 "progressBarBorderSize": 6,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "transitionDuration": 500,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "height": "100%",
 "toolTipFontStyle": "normal",
 "minWidth": 100,
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "vrPointerSelectionColor": "#006600",
 "toolTipFontFamily": "Georgia",
 "playbackBarBorderSize": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 55,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 10,
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 10,
 "toolTipPaddingTop": 7,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "top": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "shadow": false,
 "progressBarBorderColor": "#333333",
 "paddingBottom": 0,
 "playbackBarHeadHeight": 15,
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "progressBarBackgroundColor": [
  "#333333"
 ],
 "toolTipBorderColor": "#767676",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#CCCCCC"
 ],
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "class": "ViewerArea",
 "toolTipOpacity": 0.5
},
{
 "horizontalAlign": "left",
 "children": [
  "this.MapViewer"
 ],
 "id": "Container_E84C951D_C791_0CA6_41D1_DE04E519BEAE",
 "scrollBarMargin": 2,
 "width": 347.44,
 "contentOpaque": false,
 "right": "2%",
 "layout": "absolute",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "2%",
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": 320,
 "paddingBottom": 0,
 "paddingTop": 0,
 "scrollBarColor": "#000000",
 "click": "if(!this.MapViewer.get('visible')){ this.setComponentVisibility(this.MapViewer, true, 0, null, null, false) } else { this.setComponentVisibility(this.MapViewer, false, 0, null, null, false) }",
 "data": {
  "name": "Container52879"
 },
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "visible": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
  "this.Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
  "this.Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
  "this.Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
  "this.Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
  "this.Button_1B9A3D00_16C4_0505_41B2_6830155B7D52"
 ],
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": 0,
 "scrollBarMargin": 0,
 "width": "100%",
 "contentOpaque": false,
 "layout": "horizontal",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "0%",
 "paddingLeft": 40,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": true,
 "height": 77,
 "paddingBottom": 0,
 "gap": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "data": {
  "name": "-button set container"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "horizontalAlign": "right",
 "children": [
  "this.Button_7D7704C0_70C3_6C98_41D2_5E329D40B716"
 ],
 "id": "Container_7D70F4C0_70C3_6C98_41C2_140FAE67A7C0",
 "scrollBarMargin": 2,
 "width": 300,
 "contentOpaque": false,
 "right": 0.05,
 "layout": "horizontal",
 "class": "Container",
 "minHeight": 1,
 "verticalAlign": "bottom",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "bottom": "0.03%",
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": 300,
 "paddingBottom": 0,
 "gap": 0,
 "paddingTop": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "-button set"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "layout": "absolute",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "right": "0%",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "bottom": "0%",
 "top": "0%",
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingLeft": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "shadow": false,
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "paddingBottom": 0,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "--INFO"
 },
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "visible": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "layout": "absolute",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "right": "0%",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "bottom": "0%",
 "top": "0%",
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingLeft": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "shadow": false,
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "paddingBottom": 0,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "--LOCATION"
 },
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "visible": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "layout": "absolute",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "right": "0%",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "bottom": "0%",
 "top": "0%",
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingLeft": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "shadow": false,
 "propagateClick": true,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "--PHOTOALBUM"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "layout": "absolute",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "right": "0%",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "bottom": "0%",
 "top": "0%",
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingLeft": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "shadow": false,
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "paddingBottom": 0,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#333333",
 "data": {
  "name": "--REALTOR"
 },
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "visible": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_D77C424A_EC3A_C529_41B2_97C927805A61"
 ],
 "id": "Container_D77CA24A_EC3A_C529_41E2_B897B2B1A320",
 "left": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "layout": "absolute",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "right": "0%",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "bottom": "0%",
 "top": "0%",
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingLeft": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "shadow": false,
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_D77CA24A_EC3A_C529_41E2_B897B2B1A320, false, 0, null, null, false)",
 "paddingBottom": 0,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "--PANORAMA LIST"
 },
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "visible": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "gap": 5,
 "fontColor": "#FFFFFF",
 "id": "Button_7D7704C0_70C3_6C98_41D2_5E329D40B716",
 "rollOverBackgroundOpacity": 0,
 "width": 100,
 "shadowColor": "#000000",
 "fontFamily": "Arial",
 "iconHeight": 50,
 "layout": "horizontal",
 "class": "Button",
 "pressedIconHeight": 50,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "verticalAlign": "middle",
 "rollOverBackgroundColor": [
  "#333333"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "toggle",
 "borderRadius": 0,
 "pressedIconWidth": 50,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadowSpread": 1,
 "shadow": false,
 "propagateClick": false,
 "height": 100,
 "paddingBottom": 0,
 "fontStyle": "normal",
 "backgroundColorRatios": [
  0
 ],
 "fontSize": 12,
 "backgroundColor": [
  "#333333"
 ],
 "paddingTop": 0,
 "iconURL": "skin/Button_7D7704C0_70C3_6C98_41D2_5E329D40B716.png",
 "data": {
  "name": "Button Settings Fullscreen"
 },
 "textDecoration": "none",
 "iconWidth": 50,
 "iconBeforeLabel": true,
 "fontWeight": "normal",
 "cursor": "hand",
 "pressedIconURL": "skin/Button_7D7704C0_70C3_6C98_41D2_5E329D40B716_pressed.png",
 "backgroundColorDirection": "vertical"
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 5.65,
   "yaw": -153.84,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.57
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C5853522_D1C4_69F9_41C6_60221311EBE0, this.camera_616E98F8_7145_A469_41DB_AFFE3393BB6C); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7E677ED2_70CD_5CB8_41C8_9867EDCE53B8",
   "hfov": 5.65,
   "pitch": -12.57,
   "yaw": -153.84,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F43BAE32_D244_3BD9_41D8_601B1EFC51B5",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "toolTipFontSize": 12,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "toolTipPaddingBottom": 4,
 "progressBarBorderSize": 6,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "transitionDuration": 500,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "height": "100%",
 "toolTipFontStyle": "normal",
 "minWidth": 1,
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "vrPointerSelectionColor": "#006600",
 "toolTipFontFamily": "Arial",
 "playbackBarBorderSize": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "top": "0%",
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "shadow": false,
 "progressBarBorderColor": "#333333",
 "paddingBottom": 0,
 "playbackBarHeadHeight": 15,
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "progressBarBackgroundColor": [
  "#333333"
 ],
 "toolTipBorderColor": "#767676",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#CCCCCC"
 ],
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "class": "ViewerArea",
 "toolTipOpacity": 1
},
{
 "horizontalAlign": "center",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "class": "IconButton",
 "width": "14.22%",
 "right": 10,
 "minHeight": 50,
 "top": "20%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "bottom": "20%",
 "borderSize": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "IconButton >"
 },
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "width": "14.22%",
 "class": "IconButton",
 "minHeight": 50,
 "top": "20%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "bottom": "20%",
 "borderSize": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "paddingBottom": 0,
 "transparencyActive": false,
 "paddingTop": 0,
 "data": {
  "name": "IconButton <"
 },
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "cursor": "hand"
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 5.76,
   "yaw": 160.26,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.8
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B, this.camera_61877927_7145_A5E7_41C3_BF91C2829E4B); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7E667ED3_70CD_5CB8_41A0_C37953382E0D",
   "hfov": 5.76,
   "pitch": -5.8,
   "yaw": 160.26,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C6F83E08_D1C4_FBC9_41DD_E97355DA227F",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "items": [
  {
   "media": "this.photo_C83A206C_D244_2849_41E9_3F529EA892A7",
   "class": "PhotoPlayListItem",
   "camera": {
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "targetPosition": {
     "x": "0.41",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.57"
    },
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "scaleMode": "fit_outside",
    "duration": 5000
   }
  },
  {
   "media": "this.photo_C5C39AED_D244_184B_41C6_600529002A2B",
   "class": "PhotoPlayListItem",
   "camera": {
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "targetPosition": {
     "x": "0.52",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.59"
    },
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "scaleMode": "fit_outside",
    "duration": 5000
   }
  },
  {
   "media": "this.photo_CAD51DDC_D244_1849_41CE_79EFA9C77B62",
   "class": "PhotoPlayListItem",
   "camera": {
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "targetPosition": {
     "x": "0.64",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.59"
    },
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "scaleMode": "fit_outside",
    "duration": 5000
   }
  },
  {
   "media": "this.photo_C88D987D_D244_184B_41EA_169C7B75AE6D",
   "class": "PhotoPlayListItem",
   "camera": {
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "targetPosition": {
     "x": "0.37",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.60"
    },
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "scaleMode": "fit_outside",
    "duration": 5000
   }
  },
  {
   "media": "this.photo_C8F5A988_D24C_38C9_41CF_7B49A1F79820",
   "class": "PhotoPlayListItem",
   "camera": {
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "targetPosition": {
     "x": "0.67",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.39"
    },
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "scaleMode": "fit_outside",
    "duration": 5000
   }
  },
  {
   "media": "this.photo_CB799672_D24C_2859_41C9_6DAF53C87F96",
   "class": "PhotoPlayListItem",
   "camera": {
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "targetPosition": {
     "x": "0.32",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.63"
    },
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "scaleMode": "fit_outside",
    "duration": 5000
   }
  },
  {
   "media": "this.photo_CA2F431E_D24C_29C9_41D3_E5D06530EB54",
   "class": "PhotoPlayListItem",
   "camera": {
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "targetPosition": {
     "x": "0.58",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.73"
    },
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "scaleMode": "fit_outside",
    "duration": 5000
   }
  },
  {
   "media": "this.photo_C800BC76_D24C_1859_41E9_B25EDC97ABEE",
   "class": "PhotoPlayListItem",
   "camera": {
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "targetPosition": {
     "x": "0.64",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.49"
    },
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "scaleMode": "fit_outside",
    "duration": 5000
   }
  },
  {
   "media": "this.photo_CAD85B6E_D24C_1849_41C5_19D0275E47F3",
   "class": "PhotoPlayListItem",
   "camera": {
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "targetPosition": {
     "x": "0.28",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.72"
    },
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "scaleMode": "fit_outside",
    "duration": 5000
   }
  },
  {
   "media": "this.photo_CBC1B58B_D24C_28CF_41E7_46AF6E41183C",
   "class": "PhotoPlayListItem",
   "camera": {
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "targetPosition": {
     "x": "0.43",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.68"
    },
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "scaleMode": "fit_outside",
    "duration": 5000
   }
  },
  {
   "media": "this.photo_CBE4D27E_D24C_2849_41D3_C672F0DFAF3C",
   "class": "PhotoPlayListItem",
   "camera": {
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "targetPosition": {
     "x": "0.36",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.71"
    },
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "scaleMode": "fit_outside",
    "duration": 5000
   }
  },
  {
   "media": "this.photo_C88E8CC1_D24C_38BB_41BB_207813441F0A",
   "class": "PhotoPlayListItem",
   "camera": {
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "targetPosition": {
     "x": "0.31",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.43"
    },
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "scaleMode": "fit_outside",
    "duration": 5000
   }
  }
 ],
 "id": "album_D1FE7BC1_C691_1B9E_41D2_18075FA50A31_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "media": "this.panorama_C5853522_D1C4_69F9_41C6_60221311EBE0",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_615C18E0_7145_A499_41DA_28AEE9B49ED4, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_615C18E0_7145_A499_41DA_28AEE9B49ED4",
 "camera": "this.panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_camera"
},
{
 "media": "this.panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_616388E1_7145_A49B_41B1_EF3441517E6E, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_616388E1_7145_A49B_41B1_EF3441517E6E",
 "camera": "this.panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_camera"
},
{
 "media": "this.panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_616358E1_7145_A49B_41BC_859A438DEB28, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_616358E1_7145_A49B_41BC_859A438DEB28",
 "camera": "this.panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_camera"
},
{
 "media": "this.panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_616328E1_7145_A49B_41D9_001D8984C9C3, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_616328E1_7145_A49B_41D9_001D8984C9C3",
 "camera": "this.panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_camera"
},
{
 "map": {
  "width": 200,
  "x": 624.29,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_094B4823_05ED_C9F9_4190_590188D12132_HS_0_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 387.41,
  "class": "HotspotMapOverlayMap",
  "height": 200,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 624.29,
  "y": 387.41,
  "width": 200,
  "image": {
   "levels": [
    {
     "url": "media/map_094B4823_05ED_C9F9_4190_590188D12132_HS_0.png",
     "width": 200,
     "class": "ImageResourceLevel",
     "height": 200
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage",
  "height": 200
 },
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_0805417C_05ED_5A4F_4192_3B504840BD11",
 "data": {
  "label": "Bedroom"
 }
},
{
 "map": {
  "width": 200,
  "x": 1426.18,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_094B4823_05ED_C9F9_4190_590188D12132_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 299.2,
  "class": "HotspotMapOverlayMap",
  "height": 200,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 1426.18,
  "y": 299.2,
  "width": 200,
  "image": {
   "levels": [
    {
     "url": "media/map_094B4823_05ED_C9F9_4190_590188D12132_HS_1.png",
     "width": 200,
     "class": "ImageResourceLevel",
     "height": 200
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage",
  "height": 200
 },
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_08B68612_05ED_39DB_4195_4995E530FEF6",
 "data": {
  "label": "Bedroom 2"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 5.21,
   "yaw": -40.38,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.98
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E, this.camera_61704907_7145_A5A7_41DB_266342860D17); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7E583ED0_70CD_5CB8_41A2_A5CFF9E8E3EA",
   "hfov": 5.21,
   "pitch": -1.98,
   "yaw": -40.38,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F8A9C857_D244_3847_41E2_BD52B1A0CC26",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 7.19,
   "yaw": 134.85,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.63
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B, this.camera_617F9916_7145_A5B9_41CA_88C637F30FB7); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7E67CED2_70CD_5CB8_41B9_D856986E78D0",
   "hfov": 7.19,
   "pitch": -2.63,
   "yaw": 134.85,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CE492709_EDC5_4B2B_41D3_ECFA9D21F546",
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "map": {
  "width": 200,
  "x": 142.74,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_0803C762_05ED_467B_4191_0B2ECE6162FD_HS_0_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 805.92,
  "class": "HotspotMapOverlayMap",
  "height": 200,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 142.74,
  "y": 805.92,
  "width": 200,
  "image": {
   "levels": [
    {
     "url": "media/map_0803C762_05ED_467B_4191_0B2ECE6162FD_HS_0.png",
     "width": 200,
     "class": "ImageResourceLevel",
     "height": 200
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage",
  "height": 200
 },
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_08C9EDBD_05EF_CAC9_4168_066192E61566",
 "data": {
  "label": "Living"
 }
},
{
 "map": {
  "width": 200,
  "x": 1166.96,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_0803C762_05ED_467B_4191_0B2ECE6162FD_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 526.99,
  "class": "HotspotMapOverlayMap",
  "height": 200,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 1166.96,
  "y": 526.99,
  "width": 200,
  "image": {
   "levels": [
    {
     "url": "media/map_0803C762_05ED_467B_4191_0B2ECE6162FD_HS_1.png",
     "width": 200,
     "class": "ImageResourceLevel",
     "height": 200
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage",
  "height": 200
 },
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_092E97FC_05EE_C64F_4169_29B136774246",
 "data": {
  "label": "Living 2"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 5.21,
   "yaw": -129,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.39
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0, this.camera_6191D937_7145_A5E7_41A2_3B343348F55C); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7E671ED2_70CD_5CB8_41C2_4754646D7C35",
   "hfov": 5.21,
   "pitch": -2.39,
   "yaw": -129,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F8F54524_D244_69F9_41E1_4A45C95970D3",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 7.2,
   "yaw": 96.47,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.65
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C5853522_D1C4_69F9_41C6_60221311EBE0, this.camera_61A2B946_7145_A599_4159_D80304D8FB47); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7E66CED3_70CD_5CB8_41D1_4294984C6A85",
   "hfov": 7.2,
   "pitch": -1.65,
   "yaw": 96.47,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CD0BAA06_EDC5_4519_41C0_1E2BA3AF2D86",
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "toolTipFontSize": 12,
 "id": "MapViewer",
 "left": "0%",
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "toolTipPaddingBottom": 4,
 "progressBarBorderSize": 6,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "transitionDuration": 500,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "height": "100%",
 "toolTipFontStyle": "normal",
 "minWidth": 1,
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "vrPointerSelectionColor": "#006600",
 "toolTipFontFamily": "Arial",
 "playbackBarBorderSize": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "bottom": "0%",
 "progressBorderRadius": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipDisplayTime": 600,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "paddingLeft": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "shadow": false,
 "progressBarBorderColor": "#333333",
 "paddingBottom": 0,
 "playbackBarHeadHeight": 15,
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "progressBarBackgroundColor": [
  "#333333"
 ],
 "toolTipBorderColor": "#767676",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#CCCCCC"
 ],
 "data": {
  "name": "Floor Plan"
 },
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "class": "ViewerArea",
 "toolTipOpacity": 1
},
{
 "horizontalAlign": "center",
 "gap": 5,
 "fontColor": "#FFFFFF",
 "id": "Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 0,
 "width": 50,
 "pressedFontColor": "#000000",
 "shadowColor": "#000000",
 "fontFamily": "Montserrat",
 "iconHeight": 0,
 "rollOverBackgroundOpacity": 0,
 "class": "Button",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "layout": "horizontal",
 "verticalAlign": "middle",
 "rollOverShadow": false,
 "rollOverBackgroundColor": [
  "#333333"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadowSpread": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "propagateClick": true,
 "height": 40,
 "paddingBottom": 0,
 "fontStyle": "normal",
 "backgroundColorRatios": [
  0
 ],
 "fontSize": "14.025px",
 "backgroundColor": [
  "#000000"
 ],
 "label": "INFO",
 "paddingTop": 0,
 "rollOverFontColor": "#333333",
 "textDecoration": "none",
 "iconWidth": 0,
 "iconBeforeLabel": true,
 "data": {
  "name": "Button house info"
 },
 "fontWeight": "bold",
 "cursor": "hand",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "gap": 5,
 "fontColor": "#FFFFFF",
 "id": "Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 0,
 "width": 52.7,
 "pressedFontColor": "#000000",
 "shadowColor": "#000000",
 "fontFamily": "Montserrat",
 "iconHeight": 32,
 "rollOverBackgroundOpacity": 0,
 "class": "Button",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false); this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_614F28DB_7145_A4AF_41A9_5817583DF6D1.set('selectedIndex', -1); }, this); this.playList_614F28DB_7145_A4AF_41A9_5817583DF6D1.set('selectedIndex', 0)",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "layout": "horizontal",
 "verticalAlign": "middle",
 "rollOverBackgroundColor": [
  "#333333"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadowSpread": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "propagateClick": true,
 "height": 40,
 "paddingBottom": 0,
 "fontStyle": "normal",
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": "14.025px",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "FOTO",
 "paddingTop": 0,
 "rollOverFontColor": "#333333",
 "textDecoration": "none",
 "iconWidth": 32,
 "iconBeforeLabel": true,
 "data": {
  "name": "Button photoalbum"
 },
 "fontWeight": "bold",
 "cursor": "hand",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "gap": 5,
 "fontColor": "#FFFFFF",
 "id": "Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 0,
 "width": 111.65,
 "pressedFontColor": "#000000",
 "shadowColor": "#000000",
 "fontFamily": "Montserrat",
 "iconHeight": 32,
 "rollOverBackgroundOpacity": 0,
 "class": "Button",
 "click": "if(!this.Container_E84C951D_C791_0CA6_41D1_DE04E519BEAE.get('visible')){ this.setComponentVisibility(this.Container_E84C951D_C791_0CA6_41D1_DE04E519BEAE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_E84C951D_C791_0CA6_41D1_DE04E519BEAE, false, 0, null, null, false) }",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "layout": "horizontal",
 "verticalAlign": "middle",
 "rollOverBackgroundColor": [
  "#333333"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadowSpread": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "propagateClick": true,
 "height": 40,
 "paddingBottom": 0,
 "fontStyle": "normal",
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": "14.025px",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "PLANIMETRIE",
 "paddingTop": 0,
 "rollOverFontColor": "#333333",
 "textDecoration": "none",
 "iconWidth": 32,
 "iconBeforeLabel": true,
 "data": {
  "name": "Button floorplan"
 },
 "fontWeight": "bold",
 "cursor": "hand",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "gap": 5,
 "fontColor": "#FFFFFF",
 "id": "Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 0,
 "width": 118.65,
 "pressedFontColor": "#000000",
 "shadowColor": "#000000",
 "fontFamily": "Montserrat",
 "iconHeight": 32,
 "rollOverBackgroundOpacity": 0,
 "class": "Button",
 "click": "if(!this.Container_D77CA24A_EC3A_C529_41E2_B897B2B1A320.get('visible')){ this.setComponentVisibility(this.Container_D77CA24A_EC3A_C529_41E2_B897B2B1A320, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_D77CA24A_EC3A_C529_41E2_B897B2B1A320, false, 0, null, null, false) }",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "layout": "horizontal",
 "verticalAlign": "middle",
 "rollOverBackgroundColor": [
  "#333333"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadowSpread": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "propagateClick": true,
 "height": 40,
 "paddingBottom": 0,
 "fontStyle": "normal",
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": "14.025px",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "PANORAMICHE",
 "paddingTop": 0,
 "rollOverFontColor": "#333333",
 "textDecoration": "none",
 "iconWidth": 32,
 "iconBeforeLabel": true,
 "data": {
  "name": "Button panorama list"
 },
 "fontWeight": "bold",
 "cursor": "hand",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "gap": 5,
 "fontColor": "#FFFFFF",
 "id": "Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 0,
 "width": 87.35,
 "pressedFontColor": "#000000",
 "shadowColor": "#000000",
 "fontFamily": "Montserrat",
 "iconHeight": 32,
 "rollOverBackgroundOpacity": 0,
 "class": "Button",
 "click": "if(!this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7.get('visible')){ this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false) }",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "layout": "horizontal",
 "verticalAlign": "middle",
 "rollOverBackgroundColor": [
  "#333333"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadowSpread": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "propagateClick": true,
 "height": 40,
 "paddingBottom": 0,
 "fontStyle": "normal",
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": "14.025px",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "INDIRIZZO",
 "paddingTop": 0,
 "rollOverFontColor": "#333333",
 "textDecoration": "none",
 "iconWidth": 32,
 "iconBeforeLabel": true,
 "data": {
  "name": "Button location"
 },
 "fontWeight": "bold",
 "cursor": "hand",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "gap": 5,
 "fontColor": "#FFFFFF",
 "id": "Button_1B9A3D00_16C4_0505_41B2_6830155B7D52",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 0,
 "width": 76.7,
 "pressedFontColor": "#000000",
 "shadowColor": "#000000",
 "fontFamily": "Montserrat",
 "iconHeight": 32,
 "rollOverBackgroundOpacity": 0,
 "class": "Button",
 "click": "if(!this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC.get('visible')){ this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false) }",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "layout": "horizontal",
 "verticalAlign": "middle",
 "rollOverBackgroundColor": [
  "#333333"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadowSpread": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "propagateClick": true,
 "height": 40,
 "paddingBottom": 0,
 "fontStyle": "normal",
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": "14.025px",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "CONTATTI",
 "paddingTop": 0,
 "rollOverFontColor": "#333333",
 "textDecoration": "none",
 "iconWidth": 32,
 "iconBeforeLabel": true,
 "data": {
  "name": "Button realtor"
 },
 "fontWeight": "bold",
 "cursor": "hand",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "10%",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "contentOpaque": false,
 "right": "10%",
 "layout": "horizontal",
 "class": "Container",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "shadowOpacity": 0.3,
 "top": "5%",
 "backgroundOpacity": 1,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "bottom": "5%",
 "borderSize": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "shadow": true,
 "propagateClick": false,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "right",
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "10%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "right": "10%",
 "layout": "vertical",
 "class": "Container",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 20,
 "top": "5%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "bottom": "80%",
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "paddingBottom": 0,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "data": {
  "name": "Container X global"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
  "this.Container_221C9648_0C06_E5FD_41A1_A79DE53B3031"
 ],
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "10%",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "contentOpaque": false,
 "right": "10%",
 "layout": "horizontal",
 "class": "Container",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "shadowOpacity": 0.3,
 "top": "5%",
 "backgroundOpacity": 1,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "bottom": "5%",
 "borderSize": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "shadow": true,
 "propagateClick": false,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "right",
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "10%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "right": "10%",
 "layout": "vertical",
 "class": "Container",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 20,
 "top": "5%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "bottom": "80%",
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "paddingBottom": 0,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "data": {
  "name": "Container X global"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "horizontalAlign": "center",
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "contentOpaque": false,
 "right": "15%",
 "layout": "vertical",
 "class": "Container",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "shadowOpacity": 0.3,
 "top": "7%",
 "backgroundOpacity": 1,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "bottom": "7%",
 "borderSize": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "shadow": true,
 "propagateClick": false,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "visible",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "10%",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "contentOpaque": false,
 "right": "10%",
 "layout": "horizontal",
 "class": "Container",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "shadowOpacity": 0.3,
 "top": "5%",
 "backgroundOpacity": 1,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "bottom": "5%",
 "borderSize": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "shadow": true,
 "propagateClick": false,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "right",
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "10%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "right": "10%",
 "layout": "vertical",
 "class": "Container",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 20,
 "top": "5%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "bottom": "80%",
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "paddingBottom": 0,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "data": {
  "name": "Container X global"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "horizontalAlign": "center",
 "children": [
  "this.Container_D77C524A_EC3A_C529_41E9_EC4D91E575D2",
  "this.ThumbnailGrid_D77C924A_EC3A_C529_41D6_845B788BE44A"
 ],
 "id": "Container_D77C424A_EC3A_C529_41B2_97C927805A61",
 "left": "15%",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "contentOpaque": false,
 "right": "15%",
 "layout": "vertical",
 "class": "Container",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "shadowOpacity": 0.3,
 "top": "7%",
 "backgroundOpacity": 1,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "bottom": "7%",
 "borderSize": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "shadow": true,
 "propagateClick": false,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "visible",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C4857004_D1C5_E7B9_41D4_A43B8B48439E_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_7E677ED2_70CD_5CB8_41C8_9867EDCE53B8",
 "rowCount": 3,
 "colCount": 3
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C6F82E08_D1C4_FBC9_41E9_0BFF61468BC0_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_7E667ED3_70CD_5CB8_41A0_C37953382E0D",
 "rowCount": 3,
 "colCount": 3
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_7E583ED0_70CD_5CB8_41A2_A5CFF9E8E3EA",
 "rowCount": 3,
 "colCount": 3
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C5853522_D1C4_69F9_41C6_60221311EBE0_0_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "id": "AnimatedImageResource_7E67CED2_70CD_5CB8_41B9_D856986E78D0",
 "rowCount": 6,
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_7E671ED2_70CD_5CB8_41C2_4754646D7C35",
 "rowCount": 3,
 "colCount": 3
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C9E976A3_D1C4_28FF_41E6_F196508CD82B_0_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "id": "AnimatedImageResource_7E66CED3_70CD_5CB8_41D1_4294984C6A85",
 "rowCount": 6,
 "colCount": 4
},
{
 "horizontalAlign": "center",
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "scrollBarMargin": 2,
 "width": "85%",
 "contentOpaque": false,
 "layout": "absolute",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "-left"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "scrollBarMargin": 2,
 "width": "50%",
 "contentOpaque": false,
 "layout": "vertical",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 50,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "minWidth": 460,
 "borderRadius": 0,
 "paddingLeft": 50,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 20,
 "gap": 0,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#0069A3",
 "data": {
  "name": "-right"
 },
 "scrollBarOpacity": 0.51,
 "overflow": "visible",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "width": "25%",
 "class": "IconButton",
 "minHeight": 50,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "propagateClick": false,
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "height": "75%",
 "data": {
  "name": "X"
 },
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "id": "Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
 "scrollBarMargin": 2,
 "width": "85%",
 "contentOpaque": false,
 "layout": "absolute",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "-left"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
  "this.Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
  "this.Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6"
 ],
 "id": "Container_221C9648_0C06_E5FD_41A1_A79DE53B3031",
 "scrollBarMargin": 2,
 "width": "15%",
 "contentOpaque": false,
 "layout": "vertical",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 50,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "minWidth": 400,
 "borderRadius": 0,
 "paddingLeft": 50,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 20,
 "gap": 0,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#0069A3",
 "data": {
  "name": "-right"
 },
 "scrollBarOpacity": 0.51,
 "overflow": "visible",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "width": "25%",
 "class": "IconButton",
 "minHeight": 50,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "propagateClick": false,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "height": "75%",
 "data": {
  "name": "X"
 },
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "cursor": "hand"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "scrollBarMargin": 2,
 "width": "100%",
 "contentOpaque": false,
 "layout": "absolute",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container photo"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "visible",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "scrollBarMargin": 2,
 "width": "55%",
 "contentOpaque": false,
 "layout": "absolute",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "-left"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "scrollBarMargin": 2,
 "width": "45%",
 "contentOpaque": false,
 "layout": "vertical",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 60,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "minWidth": 460,
 "borderRadius": 0,
 "paddingLeft": 60,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 20,
 "gap": 0,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#333333",
 "data": {
  "name": "-right"
 },
 "scrollBarOpacity": 0.51,
 "overflow": "visible",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "width": "25%",
 "class": "IconButton",
 "minHeight": 50,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "propagateClick": false,
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "height": "75%",
 "data": {
  "name": "X"
 },
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "cursor": "hand"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_D77C624A_EC3A_C529_41D3_8EF0A03BB313",
  "this.IconButton_D77C824A_EC3A_C529_41E0_6EC99E2AC86A"
 ],
 "id": "Container_D77C524A_EC3A_C529_41E9_EC4D91E575D2",
 "scrollBarMargin": 2,
 "width": "100%",
 "contentOpaque": false,
 "layout": "absolute",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 0,
 "height": 227.3,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "header"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "id": "ThumbnailGrid_D77C924A_EC3A_C529_41D6_845B788BE44A",
 "itemLabelFontFamily": "Montserrat",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "width": "100%",
 "itemBorderRadius": 0,
 "itemMaxHeight": 1000,
 "itemHorizontalAlign": "center",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "minHeight": 1,
 "itemLabelPosition": "bottom",
 "verticalAlign": "middle",
 "paddingRight": 70,
 "backgroundOpacity": 0.05,
 "itemPaddingLeft": 3,
 "backgroundColor": [
  "#000000"
 ],
 "playList": "this.ThumbnailGrid_D77C924A_EC3A_C529_41D6_845B788BE44A_playlist",
 "itemThumbnailBorderRadius": 0,
 "minWidth": 1,
 "height": "100%",
 "borderSize": 0,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemWidth": 220,
 "propagateClick": false,
 "itemBackgroundOpacity": 0,
 "itemBackgroundColor": [],
 "itemPaddingTop": 3,
 "itemMinHeight": 50,
 "itemBackgroundColorRatios": [],
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemThumbnailOpacity": 1,
 "itemVerticalAlign": "top",
 "selectedItemThumbnailShadow": true,
 "backgroundColorDirection": "vertical",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "rollOverItemLabelFontColor": "#04A3E1",
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "scrollBarMargin": 2,
 "itemThumbnailHeight": 125,
 "itemLabelTextDecoration": "none",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemMinWidth": 50,
 "itemLabelFontWeight": "normal",
 "rollOverItemThumbnailShadow": true,
 "itemPaddingRight": 3,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": 14,
 "itemHeight": 156,
 "selectedItemLabelFontColor": "#04A3E1",
 "scrollBarWidth": 10,
 "itemThumbnailWidth": 220,
 "itemOpacity": 1,
 "borderRadius": 5,
 "itemLabelFontColor": "#666666",
 "paddingLeft": 70,
 "itemBackgroundColorDirection": "vertical",
 "shadow": false,
 "itemThumbnailShadow": false,
 "paddingBottom": 70,
 "gap": 26,
 "paddingTop": 10,
 "selectedItemLabelFontWeight": "bold",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#04A3E1",
 "itemPaddingBottom": 3,
 "itemLabelGap": 7,
 "itemLabelFontStyle": "normal",
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "data": {
  "name": "ThumbnailList"
 },
 "scrollBarVisible": "rollOver",
 "itemMode": "normal",
 "class": "ThumbnailGrid",
 "itemMaxWidth": 1000
},
{
 "horizontalAlign": "center",
 "maxHeight": 1000,
 "maxWidth": 2000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "width": "100%",
 "class": "Image",
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "minHeight": 1,
 "top": "0%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 0,
 "paddingTop": 0,
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 }
},
{
 "horizontalAlign": "right",
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "scrollBarMargin": 2,
 "width": "100%",
 "contentOpaque": false,
 "layout": "horizontal",
 "class": "Container",
 "minHeight": 0,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 0,
 "height": 60,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "gap": 0,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container space"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F"
 ],
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "scrollBarMargin": 2,
 "width": "100%",
 "contentOpaque": false,
 "layout": "vertical",
 "class": "Container",
 "minHeight": 520,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 100,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 30,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#E73B2C",
 "data": {
  "name": "Container text"
 },
 "scrollBarOpacity": 0.79,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "scrollBarMargin": 2,
 "width": 370,
 "contentOpaque": false,
 "layout": "horizontal",
 "class": "Container",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "height": 40,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container space"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "left": "0%",
 "insetBorder": false,
 "scrollEnabled": true,
 "class": "WebFrame",
 "right": "0%",
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4926.913825635137!2d11.337888516216342!3d44.470982807181336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fd5271788fcdf%3A0xd3832a9d578db42c!2sVia%20S.%20Vittore%2C%2025%2C%2040136%20Bologna%20BO!5e1!3m2!1sen!2sit!4v1635786055529!5m2!1sen!2sit\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"",
 "minHeight": 1,
 "paddingRight": 0,
 "bottom": "0%",
 "top": "0%",
 "backgroundOpacity": 1,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "shadow": false,
 "propagateClick": false,
 "paddingBottom": 0,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "WebFrame48191"
 },
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "right",
 "id": "Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
 "scrollBarMargin": 2,
 "width": "100%",
 "contentOpaque": false,
 "layout": "horizontal",
 "class": "Container",
 "minHeight": 0,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 0,
 "height": 60,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "gap": 0,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container space"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
  "this.Button_221B5648_0C06_E5FD_4198_40C786948FF0"
 ],
 "id": "Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
 "scrollBarMargin": 2,
 "width": "100%",
 "contentOpaque": false,
 "layout": "vertical",
 "class": "Container",
 "minHeight": 520,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 100,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 30,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#E73B2C",
 "data": {
  "name": "Container text"
 },
 "scrollBarOpacity": 0.79,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "id": "Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6",
 "scrollBarMargin": 2,
 "width": 370,
 "contentOpaque": false,
 "layout": "horizontal",
 "class": "Container",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "height": 40,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container space"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "right",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "class": "IconButton",
 "width": "10%",
 "right": 20,
 "minHeight": 50,
 "top": 20,
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "height": "10%",
 "data": {
  "name": "IconButton X"
 },
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxHeight": 1000,
 "maxWidth": 2000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "width": "100%",
 "class": "Image",
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "minHeight": 1,
 "top": "0%",
 "verticalAlign": "bottom",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 0,
 "paddingTop": 0,
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 }
},
{
 "horizontalAlign": "right",
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "scrollBarMargin": 2,
 "width": "100%",
 "contentOpaque": false,
 "layout": "horizontal",
 "class": "Container",
 "minHeight": 0,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 0,
 "height": 60,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "gap": 0,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container space"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "children": [
  "this.Image_21CAAB5C_2E00_5BD8_419C_BC3E5383EBA6",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
  "this.HTMLText_3E1C1F8B_2E00_7B38_41A1_67E4440B93CE"
 ],
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "scrollBarMargin": 2,
 "width": "100%",
 "contentOpaque": false,
 "layout": "vertical",
 "class": "Container",
 "minHeight": 520,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 100,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 30,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#E73B2C",
 "data": {
  "name": "Container text"
 },
 "scrollBarOpacity": 0.79,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "scrollBarMargin": 2,
 "width": 370,
 "contentOpaque": false,
 "layout": "horizontal",
 "class": "Container",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "height": 40,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container space"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "id": "HTMLText_D77C624A_EC3A_C529_41D3_8EF0A03BB313",
 "left": "0%",
 "scrollBarMargin": 2,
 "width": "77.086%",
 "class": "HTMLText",
 "minHeight": 100,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "top": "0%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 80,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 0,
 "paddingTop": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.18vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.18vh;font-family:'Bebas Neue Bold';\">PANORAMICHE</SPAN></SPAN></DIV></div>",
 "scrollBarColor": "#000000",
 "data": {
  "name": "HTMLText54192"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver"
},
{
 "horizontalAlign": "right",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_D77C824A_EC3A_C529_41E0_6EC99E2AC86A",
 "class": "IconButton",
 "width": "100%",
 "right": 20,
 "minHeight": 50,
 "top": 20,
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "pressedRollOverIconURL": "skin/IconButton_D77C824A_EC3A_C529_41E0_6EC99E2AC86A_pressed_rollover.jpg",
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_D77C824A_EC3A_C529_41E0_6EC99E2AC86A_rollover.jpg",
 "propagateClick": false,
 "iconURL": "skin/IconButton_D77C824A_EC3A_C529_41E0_6EC99E2AC86A.jpg",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "height": "36.14%",
 "data": {
  "name": "IconButton X"
 },
 "click": "this.setComponentVisibility(this.Container_D77CA24A_EC3A_C529_41E2_B897B2B1A320, false, 0, null, null, false)",
 "pressedIconURL": "skin/IconButton_D77C824A_EC3A_C529_41E0_6EC99E2AC86A_pressed.jpg",
 "cursor": "hand"
},
{
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "scrollBarMargin": 2,
 "width": "100%",
 "class": "HTMLText",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 10,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.53vmin;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.18vmin;font-family:'Bebas Neue Bold';\">Villa Laura</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:5.18vmin;\"><BR STYLE=\"letter-spacing:0vmin;color:#000000;font-size:0.71vmin;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#666666;font-size:1.65vmin;\">Villa Laura \u00e8 parte di un progetto di restauro che comprende due strutture, la villa in questione e un edificio confinante di valore storico, che fa s\u00ec che l\u2019intera area sia inserita nel RUE come ambito storico e nel PUG come tessuto della citt\u00e0 storica. La villa incorporer\u00e0 due appartamenti costruiti a specchio di 250 mq l\u2019uno, oltre ad un ampio giardino e aree private con posti auto. Questo catalogo mostra Villa Laura come il risultato del processo di restauro, grazie ad un sofisticato progetto di rendering 3D che ci permette di presentare il progetto con la massima precisione.</SPAN></SPAN></DIV></div>",
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "data": {
  "name": "HTMLText"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver"
},
{
 "id": "HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
 "scrollBarMargin": 2,
 "width": "100%",
 "class": "HTMLText",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 10,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.53vmin;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.18vmin;font-family:'Bebas Neue Bold';\">Indirizzo</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.65vmin;\"><BR STYLE=\"letter-spacing:0vmin;color:#000000;font-size:0.71vmin;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:3.06vmin;font-family:'Bebas Neue Bold';\">San Vittore 25 - Bologna (BO)</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:5.1vmin;\"><BR STYLE=\"letter-spacing:0vmin;color:#000000;font-size:0.71vmin;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#666666;font-size:1.65vmin;\">Situata appena fuori le mura del centro storico di Bologna, zona perfetta per chi cerca la tranquillit\u00e0 di un paesaggio rurale senza dover rinunciare agli stimoli di una citt\u00e0 caleidoscopica e piena di vita come Bologna. La villa \u00e8 inserita nel verde, e concede ai suoi abitanti la serenit\u00e0 di una vita fuori dal caos urbano, a contatto con la natura e con viste sorprendenti.</SPAN></SPAN></DIV></div>",
 "scrollBarColor": "#333333",
 "paddingTop": 0,
 "data": {
  "name": "HTMLText"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver"
},
{
 "horizontalAlign": "center",
 "gap": 5,
 "fontColor": "#FFFFFF",
 "id": "Button_221B5648_0C06_E5FD_4198_40C786948FF0",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "width": 207,
 "shadowColor": "#000000",
 "fontFamily": "Bebas Neue Bold",
 "iconHeight": 32,
 "rollOverBackgroundOpacity": 1,
 "class": "Button",
 "layout": "horizontal",
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "height": 59,
 "backgroundOpacity": 0.7,
 "minWidth": 1,
 "mode": "push",
 "backgroundColor": [
  "#04A3E1"
 ],
 "paddingLeft": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "shadowSpread": 1,
 "shadow": false,
 "propagateClick": false,
 "fontSize": 34,
 "paddingBottom": 0,
 "label": "lorem ipsum",
 "fontStyle": "normal",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "Button"
 },
 "textDecoration": "none",
 "iconWidth": 32,
 "visible": false,
 "iconBeforeLabel": true,
 "fontWeight": "normal",
 "cursor": "hand",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "maxHeight": 197,
 "maxWidth": 1000,
 "id": "Image_21CAAB5C_2E00_5BD8_419C_BC3E5383EBA6",
 "width": "100%",
 "class": "Image",
 "url": "skin/Image_21CAAB5C_2E00_5BD8_419C_BC3E5383EBA6.png",
 "minHeight": 1,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "11%",
 "paddingBottom": 0,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image9800"
 }
},
{
 "horizontalAlign": "center",
 "children": [
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "scrollBarMargin": 2,
 "width": "100%",
 "contentOpaque": false,
 "layout": "horizontal",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "80%",
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "- content"
 },
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "id": "HTMLText_3E1C1F8B_2E00_7B38_41A1_67E4440B93CE",
 "scrollBarMargin": 2,
 "width": "100%",
 "class": "HTMLText",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 10,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "14%",
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.65vmin;font-family:'Bebas Neue Bold';\">Zini Elio srl Via I Maggio, 47 - 40026 Imola (BO) P.IVA 01543211203 Tel. 0542 640638 - commerciale@zinielio.it</SPAN></SPAN></DIV></div>",
 "scrollBarColor": "#333333",
 "paddingTop": 0,
 "data": {
  "name": "HTMLText19460"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver"
},
{
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "scrollBarMargin": 2,
 "width": "100%",
 "class": "HTMLText",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 10,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": false,
 "height": "78.326%",
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><p STYLE=\"margin:0; line-height:2.04vmin;\"><BR STYLE=\"letter-spacing:0vmin;color:#000000;font-size:0.71vmin;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#666666;font-size:2.04vmin;font-family:'Bebas Neue Bold';\">Zini Elio srl \u00e8 nel mondo dell\u2019edilizia da sempre, da quando il giovane Elio Zini, nel 1962, lavorava per conto di terzi col suo primo trattore, tra i vari comuni della valle del Santerno, in Provincia di Bologna. Molte cose sono cambiate da allora, l\u2019azienda conta oltre 100 addetti fra tecnici, ingegneri e geometri, 150 cantieri in tutta Italia, 250 automezzi a disposizione, 3000 metri quadri di uffici e 6000 metri quadri di magazzino. Ma una cosa \u00e8 rimasta la stessa, la profonda passione per l\u2019edilizia e per il lavoro costruito giorno per giorno, quello che oggi Federica e Luca Zini portano avanti con la massima professionalit\u00e0, proprio come Elio ha sempre fatto.</SPAN></SPAN></DIV></div>",
 "scrollBarColor": "#333333",
 "paddingTop": 0,
 "data": {
  "name": "HTMLText19460"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver"
}],
 "desktopMipmappingEnabled": false,
 "shadow": false,
 "propagateClick": true,
 "mobileMipmappingEnabled": false,
 "paddingBottom": 0,
 "paddingTop": 0,
 "backgroundPreloadEnabled": true,
 "scrollBarColor": "#000000",
 "height": "100%",
 "mouseWheelEnabled": true,
 "vrPolyfillScale": 0.5,
 "data": {
  "name": "Player468"
 },
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
