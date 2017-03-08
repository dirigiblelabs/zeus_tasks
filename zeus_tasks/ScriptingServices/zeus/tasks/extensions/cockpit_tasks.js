/* globals $ */
/* eslint-env node, dirigible */

const PATH = "/tasks";
const HTML_LINK = "../../zeus_tasks/index.html";

//exports.getMenuItem = function() {
//	return {  
//      "name": "Tasks",
//      "path": PATH,
//      "link": HTML_LINK
//   };
//};

exports.getSidebarItem = function() {
	return {  
      "name": "Tasks",
      "path": PATH,
      "link": HTML_LINK,
      "category": "Develop",
      "order": 205
   };
};
