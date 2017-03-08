/* globals $ */
/* eslint-env node, dirigible */
(function(){
"use strict";

var CommentsORM = {
	dbName: "ZEUS_TASKS_COMMENT",
	properties: [
		{
			name: "id",
			dbName: "ZEUS_TASKSC_ID",
			id: true,
			required: true,
			type: "Long"
		},{
			name: "boardId",
			dbName: "ZEUS_TASKSC_ZEUS_TASKSB_ID",
			required: true,
			type: "Long"
		},{
			name: "replyToCommentId",
			dbName: "ZEUS_TASKSC_REPLY_TO_ZEUS_TASKSC_ID",
			type: "Long",
			dbValue: function(replyToCommentId){
				return replyToCommentId !==undefined ? replyToCommentId : null;
			},
			value: function(dbValue){
				return dbValue === null ? undefined : dbValue;
			},
		},{
			name: "text",
			dbName: "ZEUS_TASKSC_COMMENT_TEXT",
			type: "String",
			size: 10000
		},{
			name: "publishTime",
			dbName: "ZEUS_TASKSC_PUBLISH_TIME",
			required: true,
			type: "Long",
			dbValue: function(publishTime){
				return publishTime !== undefined ? new Date(publishTime).getTime() : Date.now();
			},
			value: function(dbValue){
				return dbValue !== null ? new Date(dbValue).toISOString() : undefined;
			},
			allowedOps: ['insert']
		},{
			name: "lastModifiedTime",
			dbName: "ZEUS_TASKSC_LASTMODIFIED_TIME",
			type: "Long",
			dbValue: function(lastModifiedTime){
				return lastModifiedTime !== undefined ? new Date(lastModifiedTime).getTime() : null;
			},
			value: function(dbValue){
				return dbValue !== null ? new Date(dbValue).toISOString() : undefined;
			}
		},{
			name: "user",
			dbName: "ZEUS_TASKSC_USER",
			type: "String",
			size: 100,
			dbValue: function(user){
				return require("net/http/user").getName();
			}
		}	
	],
	associations: [{
			name: 'replies',
			joinKey: "replyToCommentId",
			type: 'one-to-many',
			defaults: {
				flat:true
			}
		}, {
			name: 'board',
			targetDao: require("zeus_tasks/lib/board_dao").get,
			type: 'many-to-one',
			joinKey: "boardId"
		}]
};

var DAO = require('daoism/dao').DAO;
var CommentDAO  = exports.CommentDAO = function(orm){
	orm = orm || CommentsORM;
	DAO.call(this, orm, 'Comment DAO');
};
CommentDAO.prototype = Object.create(DAO.prototype);
CommentDAO.prototype.constructor = CommentDAO;

exports.get = function(){
	var dao = new CommentDAO(CommentsORM);
	return dao;
};

})();
