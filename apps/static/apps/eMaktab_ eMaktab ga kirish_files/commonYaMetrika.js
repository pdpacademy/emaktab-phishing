/* globals URLSearchParams */
/* eslint-disable */
define('analytics/commonYaMetrika', ['analytics/yaMetrikaTracker'], function (tracker) {
  'use strict';
  if (!dnevnik.user) {
    return;
  }
  function getSchoolId(school) {
    return school.id;
  }

  function getSchoolIds() {
    return (dnevnik.user.schools || []).map(getSchoolId);
  }

  function getSchoolIdPromPath() {
    let schoolId;
    let pathName = window.location.pathname.split('/');
    let index = pathName.indexOf('school');
    if (index >= 0 && (pathName.length >= index + 1)) {
      schoolId = pathName[index + 1];
    }

    if (schoolId && getSchoolIds().includes(schoolId)){
      return schoolId;
    }
    return false;
  }

  var urlParams = new URLSearchParams(window.location.search);
  var school = urlParams.get('school') || urlParams.get('schoolId') || getSchoolIdPromPath() || getSchoolIds().join(' ');
  var role = dnevnik.user.commonRole || '';
  var userinfo = (dnevnik.user.sex || 'unknown') + ' ' + dnevnik.user.age;

  var params = {};
  params.UserInfo = {};
  params.UserInfo[school] = {};
  params.UserInfo[school][dnevnik.user.id] = {};
  params.UserInfo[school][dnevnik.user.id][role] = {};
  params.UserInfo[school][dnevnik.user.id][role][userinfo] = null;

  tracker.params(params);
});
