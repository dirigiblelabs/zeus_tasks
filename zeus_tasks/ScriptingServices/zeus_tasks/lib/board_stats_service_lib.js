/* globals $ */
/* eslint-env node, dirigible */
"use strict";

var userLib = require("net/http/user");

var DataService = require('arestme/data_service').DataService;

var BoardStatsDataService = function(){
	var boardStatsDAO = require("zeus_tasks/lib/board_stats_dao").get();
	var boardVotesDAO = require("zeus_tasks/lib/board_votes_dao").get();
	DataService.call(this, boardStatsDAO, 'BoardStats Data Service');
	
	this.handlersProvider.dao.afterFound = function(entity){
		var requestingUserName = userLib.getName();
		entity.editable = entity.user === requestingUserName;
		if(requestingUserName){
			var idDef = this.orm.getPrimaryKey();
			var userVote = boardVotesDAO.getVote(entity[idDef.name], requestingUserName);
			entity.currentUserVote = userVote;
		}
	};

	var handlers = this.getResourceHandlersMap();
	
	//ensure only readonly resource handling
	for(var resPath in handlers){
		var resource = handlers[resPath];
		var verbs = Object.keys(resource);
		for(var i = 0; i<verbs.length; i++){
			if(verbs[i].toLowerCase()!== 'get')
				delete resource[verbs[i]];
		}
	}	
	
};
BoardStatsDataService.prototype = Object.create(DataService.prototype);
BoardStatsDataService.prototype.constructor = BoardStatsDataService;

exports.get = function(){
	return new BoardStatsDataService();
};
