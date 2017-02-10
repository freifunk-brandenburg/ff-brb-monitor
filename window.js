var request = require("request");
var shell = require('electron').shell;
var path = require('path');

document.addEventListener('DOMContentLoaded', function() {

  var apiUrl = 'http://map.freifunk-brandenburg.de:4000/nodelist.json';
  var lastState = {};

  var fireNotification = function(node){
    var note = new Notification(node.name+' ist offline', {
      title: node.name+' ist offline',
      body: "Der Freifunk Knoten "+node.name+" ist offline. "
    });

    note.onclick = function() {
      shell.openExternal('http://map.freifunk-brandenburg.de/#!v:m;n:'+node.id);
    };
  }

  var processNodes = function(nodes){
    nodes.forEach(function(node){

      // check if the node is in the list
      if(lastState[node.id] != undefined){

        // check if the state has changed
        if(lastState[node.id].status.online == true && node.status.online == false){
          fireNotification(node);
        }
      }else{
        if(!node.status.online){
          fireNotification(node);
        }
      }

      lastState[node.id] = node;
    });
  };

  setInterval(function(){

    request({
      url: apiUrl,
      json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            processNodes(body.nodes) // Print the json response
        }
    });
  }, 5000);
});
