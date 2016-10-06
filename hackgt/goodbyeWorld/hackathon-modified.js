window.blk = window.blk || {};
(function() {
	blk.API = function(opts) {
		this.opts = $.extend(true, {
			httpMethod : 'POST',
			outputFormat : 'json',
			parseResultMap : true
		}, opts || {});
		this.opts.defaultParams = $.extend(true, {outputFormat:this.opts.outputFormat}, this.opts.defaultParams);
		if (this.opts.parseResultMap) {
			this.opts.defaultParams.expr = '{success:success,results:resultMap.values().size()>0?resultMap.values()[0]:null}'
		}
	};
	blk.API.prototype = {
		convertRequestParams : function(params) {
			var requestParams = {};
			for (var key in params) {
				var param = params[key];
				try {
					if (typeof param == 'object') {
						requestParams[key] = JSON.stringify(param);
					} else {
						requestParams[key] = param;
					}
				} catch (err) {
					console.log('Error converting param with key {0}!'.format(key));
					console.error(err);
					requestParams[key] = param;
				}
			}
			return requestParams;
		},

		queryApi : function(url, params) {
			var fullUrl = 'https://www.blackrock.com/tools' + url;
			return $.ajax({
				method : this.opts.httpMethod,
				url : fullUrl,
				data : this.convertRequestParams($.extend(true, this.opts.defaultParams, params)),
				dataType : this.opts.outputFormat
			});
		}
	};
	blk.API.prototype.performanceData = function(params, callback) {
		if (typeof callback === 'function') {
			return this.queryApi('/json/performance', params).done(callback);
		}
		return this.queryApi('/hackathon/performance', params);
	}
	blk.API.prototype.portfolioAnalysis = function(params, callback) {
		if (typeof callback === 'function') {
			return this.queryApi('/hackathon/portfolio-analysis', params).done(callback);
		}
		return this.queryApi('/hackathon/portfolio-analysis', params);
	}
	blk.API.prototype.searchSecurities = function(params, callback) {
		if (typeof callback === 'function') {
			return this.queryApi('/hackathon/search-securities', params).done(callback);
		}
		return this.queryApi('/hackathon/search-securities', params);
	}
	blk.API.prototype.securityData = function(params, callback) {
		if (typeof callback === 'function') {
			return this.queryApi('/hackathon/security-data', params).done(callback);
		}
		return this.queryApi('/hackathon/security-data', params);
	}
})();