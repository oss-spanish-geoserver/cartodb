import CartoNode from 'carto-node';
import getCARTOData from 'new-dashboard/store/utils/getCARTOData';

import { canCreateDatasets, isViewer, hasEngine, userNotification, isNotificationVisible } from './getters';

const client = new CartoNode.AuthenticatedClient();

// Data coming from Static Page Loading,
// which requests user and config data from
// /me API endpoint.
const CARTOData = getCARTOData();

const user = {
  namespaced: true,
  state: {
    ...CARTOData.user_data,
    organizationNotifications: CARTOData.organization_notifications || [],
    showNotification: true
  },
  getters: {
    canCreateDatasets,
    isViewer,
    hasEngine,
    userNotification,
    isNotificationVisible
  },
  mutations: {
    setUserData (state, userData) {
      Object.assign(state, userData);
    },
    setOrganizationNotifications (state, organizationNotifications) {
      state.organizationNotifications = organizationNotifications;
    },
    setShowNotification (state, showNotification) {
      state.showNotification = showNotification;
    },
    updateTableCount (state, newTableCount) {
      state.table_count = newTableCount;
    }
  },
  actions: {
    updateData (context) {
      client.getConfig(function (err, _, data) {
        if (err) {
          return;
        }

        context.commit('setUserData', data.user_data);
      });
    },
    resetOrganizationNotifications (context) {
      context.commit('setOrganizationNotifications', []);
    },
    hideUserNotification (context) {
      context.commit('setShowNotification', false);
    },
    updateTableCount (context, newTableCount) {
      context.commit('updateTableCount', newTableCount);
    }
  }
};

export default user;
