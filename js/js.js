function CConfig(){
	this.init();
}
CConfig.prototype = {
	connections: {},
	host: '',
	login: '',
	password: '',
	auth: '',

	init: function(){
		this.connections = JSON.parse(localStorage.getItem('connections')) || {};

		var that = this;
		$('#host').change(function(){
			that.host = this.value;
		});
		$('#login').change(function(){
			that.login = this.value;
		});
		$('#password').change(function(){
			that.password = this.value;
		});
		$('#connAdd').click(function(){
			that.addConnection();
		});
		$('#connList').change(function(){
			that.loadConnection($('#connList').val());
		});
		$('#connRemove').click(function(){
			that.removeConnection();
		});
		this.syncConnectionsList();
	},

	addConnection: function(){
		this.connections[this.host] = {
			host: this.host,
			login: this.login,
			password: this.password
		};
		localStorage.setItem('connections', JSON.stringify(this.connections));

		this.syncConnectionsList();
	},
	removeConnection: function(){
		delete this.connections[$('#connList').val()];

		localStorage.setItem('connections', JSON.stringify(this.connections));

		this.syncConnectionsList();
	},
	loadConnection: function(host){
		this.host = this.connections[host].host;
		this.login = this.connections[host].login;
		this.password = this.connections[host].password;

		this.syncConnectionsConfig();
	},

	syncConnectionsList: function(){
		$('#connList').empty();
		for(var key in this.connections){
			$('#connList').append(new Option(this.connections[key].host, this.connections[key].host));
		}
	},
	syncConnectionsConfig: function(){
		$('#host').val(this.host);
		$('#login').val(this.login);
		$('#password').val(this.password);
	}
};

$(document).ready(function() {
	config = new CConfig();

	$('#saveRequest').click(function() {
		$('#saveRequestMethod').val($('#apimethod').val());
		$('#saveRequestParams').val($('#apiparams').val());
	});

	$('#saveRequestOk').click(function() {
		var request = {
				name: $('#saveRequestName').val(),
				method: $('#saveRequestMethod').val(),
				params: $('#saveRequestParams').val()
			},
			requests = JSON.parse(localStorage.getItem('requests')) || {};

		requests[request.name] = request;

		localStorage.setItem('requests', JSON.stringify(requests));

		$('#saveRequestModal').modal('hide');
	});


	$('#loadRequest').click(function() {
		var requests = JSON.parse(localStorage.getItem('requests')) || {};
		$('#savedRequests').empty();
		for (var name in requests) {
			$('#savedRequests').append(new Option(name, name));
		}
	});

	$('#loadRequestOk').click(function() {
		var request,
			requests = JSON.parse(localStorage.getItem('requests')) || {};

		if ($('#savedRequests').val()) {
			request = requests[$('#savedRequests').val()];
			$('#apimethod').val(request.method);
			$('#apiparams').val(request.params);
		}

		$('#loadRequestModal').modal('hide');
	});

	$('#removeSavedRequest').click(function() {
		var requests = JSON.parse(localStorage.getItem('requests')) || {};

		delete requests[$('#savedRequests').val()];
		localStorage.setItem('requests', JSON.stringify(requests));

		$('#savedRequests').empty();
		for(var name in requests){
			$('#savedRequests').append(new Option(name, name));
		}
	});


	$('#loginButton').click(function() {
		jsonRpc.connect(config.host, config.login, config.password);
	});

	$('#execute').click(function() {
		var params;
		try {
			params = $('#apiparams').val();
			if (params !== '') {
				params = JSON.parse($('#apiparams').val());
			}
			jsonRpc.call($('#apimethod').val(), params);
		}
		catch(e) {
			alert(e);
		}
	});

	$('#formatJSON').click(function(){
		var params;
		try {
			params = JSON.parse($('#apiparams').val());
			$('#apiparams').val(JSON.stringify(params, null, 4));
		}
		catch(e) {
			alert(e);
		}
	});
    
    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;
    
        // an array that will be populated with substring matches
        matches = [];
    
        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');
    
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });
    
        cb(matches);
      };
    };    

	$('#apimethod').typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'apimethods',
        limit: 14,
		source: substringMatcher(["action.create",
			"action.delete",
			"action.get",
			"action.update",
			"alert.get",
			"apiinfo.version",
			"application.create",
			"application.delete",
			"application.get",
			"application.massadd",
			"application.update",
			"configuration.export",
			"configuration.import",
			"dhost.get",
			"dservice.get",
			"dcheck.get",
			"drule.create",
			"drule.delete",
			"drule.get",
			"drule.isreadable",
			"drule.iswritable",
			"drule.update",
			"event.acknowledge",
			"event.get",
			"graph.create",
			"graph.delete",
			"graph.get",
			"graph.update",
			"graphitem.get",
			"graphprototype.create",
			"graphprototype.delete",
			"graphprototype.get",
			"graphprototype.update",
			"history.get",
			"host.create",
			"host.delete",
			"host.get",
			"host.isreadable",
			"host.iswritable",
			"host.massadd",
			"host.massremove",
			"host.massupdate",
			"host.update",
			"hostgroup.create",
			"hostgroup.delete",
			"hostgroup.get",
			"hostgroup.isreadable",
			"hostgroup.iswritable",
			"hostgroup.massadd",
			"hostgroup.massremove",
			"hostgroup.massupdate",
			"hostgroup.update",
			"hostinterface.create",
			"hostinterface.delete",
			"hostinterface.get",
			"hostinterface.massadd",
			"hostinterface.massremove",
			"hostinterface.replacehostinterfaces",
			"hostinterface.update",
			"hostprototype.create",
			"hostprototype.delete",
			"hostprototype.get",
			"hostprototype.isreadable",
			"hostprototype.iswritable",
			"hostprototype.update",
			"iconmap.create",
			"iconmap.delete",
			"iconmap.get",
			"iconmap.isreadable ",
			"iconmap.iswritable",
			"iconmap.update",
			"image.create",
			"image.delete",
			"image.get",
			"image.update",
			"item.create",
			"item.delete",
			"item.get",
			"item.isreadable",
			"item.iswritable",
			"item.update",
			"itemprototype.create",
			"itemprototype.delete",
			"itemprototype.get",
			"itemprototype.isreadable",
			"itemprototype.iswritable",
			"itemprototype.update",
			"service.adddependencies",
			"service.addtimes",
			"service.create",
			"service.delete",
			"service.deletedependencies",
			"service.deletetimes",
			"service.get",
			"service.getsla",
			"service.isreadable",
			"service.iswritable",
			"service.update",
			"discoveryrule.copy",
			"discoveryrule.create",
			"discoveryrule.delete",
			"discoveryrule.get",
			"discoveryrule.isreadable",
			"discoveryrule.iswritable",
			"discoveryrule.update",
			"maintenance.create",
			"maintenance.delete",
			"maintenance.get",
			"maintenance.update",
			"map.create",
			"map.delete",
			"map.get",
			"map.isreadable",
			"map.iswritable",
			"map.update",
			"usermedia.get",
			"mediatype.create",
			"mediatype.delete",
			"mediatype.get",
			"mediatype.update",
			"proxy.create",
			"proxy.delete",
			"proxy.get",
			"proxy.isreadable",
			"proxy.iswritable",
			"proxy.update",
			"screen.create",
			"screen.delete",
			"screen.get",
			"screen.update",
			"screenitem.create",
			"screenitem.delete",
			"screenitem.get",
			"screenitem.isreadable",
			"screenitem.iswritable",
			"screenitem.update",
			"screenitem.updatebyposition",
			"script.create",
			"script.delete",
			"script.execute",
			"script.get",
			"script.getscriptsbyhosts",
			"script.update",
			"template.create",
			"template.delete",
			"template.get",
			"template.isreadable",
			"template.iswritable",
			"template.massadd",
			"template.massremove",
			"template.massupdate",
			"template.update",
			"templatescreen.copy",
			"templatescreen.create",
			"templatescreen.delete",
			"templatescreen.get",
			"templatescreen.isreadable",
			"templatescreen.iswritable",
			"templatescreen.update",
			"templatescreenitem.get",
			"trend.get",
			"trigger.adddependencies",
			"trigger.deletedependencies",
			"trigger.create",
			"trigger.delete",
			"trigger.get",
			"trigger.isreadable",
			"trigger.iswritable",
			"trigger.update",
			"triggerprototype.create",
			"triggerprototype.delete",
			"triggerprototype.get",
			"triggerprototype.update",
			"user.addmedia",
			"user.create",
			"user.delete",
			"user.deletemedia",
			"user.get",
			"user.isreadable",
			"user.iswritable",
			"user.login",
            "user.logout",
            "user.update",
            "user.updatemedia",
            "user.updateprofile",
			"usergroup.create",
			"usergroup.delete",
			"usergroup.get",
			"usergroup.isreadable",
            "usergroup.iswritable",
            "usergroup.massadd",
            "usergroup.massupdate",
			"usergroup.update",
            "usermacro.create",
			"usermacro.createglobal",
            "usermacro.delete",
			"usermacro.deleteglobal",
			"usermacro.get",
			"usermacro.update",
			"usermacro.updateglobal",
            "valuemap.create",
            "valuemap.delete",
            "valuemap.get",
            "valuemap.update",
			"httptest.create",
			"httptest.delete",
			"httptest.get",
			"httptest.isreadable",
			"httptest.iswritable",
			"httptest.update"
		])
	});

});
