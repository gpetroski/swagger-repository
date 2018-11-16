const { Map } = require('immutable');

export const ProxyRequestWrapperPlugin = function(system) {
  return {
    statePlugins: {
      spec: {
        wrapActions: {
          executeRequest: (oriAction, system) => (args) => {
            if(args && args.hasOwnProperty('spec') && args.hasOwnProperty('scheme')) {
                var spec = JSON.parse(JSON.stringify(args.spec));
                spec.basePath =  '/proxy/v1/service?url=' + encodeURIComponent(args.scheme + "://" + spec.host + spec.basePath);
                spec.host = location.host;
                args.spec = spec;
            }

            return oriAction(args);
          }
        }
      }
    }
  }
}

export const ProxyRemovalSelectorsPlugin = function(system) {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          url: (oriSelector, system) => (state, ...args) => {
            return removeProxy(state.get('url'));
          },
          mutatedRequestFor: (oriSelector, system) => (state, ...args) => {
            var selector = state.get('mutatedRequests', Map()).getIn(args, null);

            var overrideSelector = selector;
            if (selector && selector.get('url')) {
              overrideSelector = selector.set('url', removeProxy(selector.get('url')));
            }
            console.log("mutatedRequests", overrideSelector);
            return overrideSelector;
          },
          requestFor: (oriSelector, system) => (state, ...args) => {
            var selector = state.get('requests', Map()).getIn(args, null);

            var overrideSelector = selector;
            if (selector && selector.get('url')) {
              overrideSelector = selector.set('url', removeProxy(selector.get('url')));
            }
            console.log("requests", overrideSelector);
            return overrideSelector;
          }
        }
      }
    }
  }
}

const removeProxy = (url) => {
  var newUrl = url;
  var reg = new RegExp( '[?&]url=([^&#]*)', 'i' );
  var urlParam = reg.exec(url);
  if (urlParam && urlParam.length > 1) {
    newUrl = decodeURIComponent(urlParam[1]);
  }
  return newUrl;
}