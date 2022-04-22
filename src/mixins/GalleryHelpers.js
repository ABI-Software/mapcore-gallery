import axios from 'axios'

const getRequest = async (url, params, timeout) => {
  return await axios({
    method: "get",
    url,
    params,
    timeout
  })
}

export default {
  data() {
    return {
      defaultImg: require('../assets/logo-sparc-wave-primary.svg'),
    }
  },
  methods: {
    /**
     * Returns a file path for S3.
     * @param {String} dataset_id dataset id.
     * @param {String} dataset_version dataset version.
     * @param {String} file_path file path.
     * @returns {String} full path to S3 file.
     */
    getS3FilePath(dataset_id, dataset_version, file_path) {
      const encoded_file_path = encodeURIComponent(file_path)
      return `${dataset_id}/${dataset_version}/files/${encoded_file_path}`
    },
    findEntryWithPathInArray(array, path) {
      if (path && array) {
        for (let i = 0; i < array.length; i++) {
          if (path === array[i].dataset.path)
            return array[i];
        }
      }
      return undefined;
    },
    getThumbnailForPlot(plot, thumbnails) {
      if (thumbnails && plot) {
        return this.findEntryWithPathInArray(thumbnails, plot.datacite.isSourceOf.path[0]);
      }
      return undefined;
    },
    getThumbnailForScaffold(scaffold, scaffoldViews, thumbnails, index) {
      if (thumbnails && (thumbnails.length > 0)) {
        let thumbnail = undefined;
        if (scaffold && scaffoldViews) {
          const view = this.findEntryWithPathInArray(scaffoldViews, scaffold.datacite.isSourceOf.path[0])
          if (view) {
            thumbnail = this.findEntryWithPathInArray(thumbnails, view.datacite.isSourceOf.path[0]);
          }
        }
        if (thumbnail) {
          return thumbnail
        } else if (index < thumbnails.length) {
          return thumbnails[index]
        }
      }
      return undefined;
    },
    getImageURLFromS3(apiEndpoint, info) {
      return `${apiEndpoint}/s3-resource/${info.datasetId}/${info.datasetVersion}/files/${info.file_path}?encodeBase64=true`
    },
    getSegmentationThumbnailURL(apiEndpoint, info) {
      let endpoint = `${apiEndpoint}/thumbnail/neurolucida`
      endpoint = endpoint + `?datasetId=${info.datasetId}`
      endpoint = endpoint + `&version=${info.datasetVersion}`
      endpoint = endpoint + `&path=files/${info.segmentationFilePath}`
      return endpoint
    },
    getThumbnailURLFromBiolucida(apiEndpoint, info) {
      return`${apiEndpoint}/thumbnail/${info.id}`
    },
    getImageInfoFromBiolucida(apiEndpoint, items, info) {
      const endpoint = `${apiEndpoint}/image/${info.id}`
      const params = { }
      getRequest(endpoint, params, 20000)
        .then(
          response => {
            let item = items.find(x => x.id === info.id)
            const name = response.name
            if (name) {
              this.$set(item, 'title', name.substring(0, name.lastIndexOf('.')))
            }
          },
          reason => {
            if (
              reason.message.includes('timeout') &&
              reason.message.includes('exceeded') &&
              info.fetchAttempts < 3
            ) {
              info.fetchAttempts += 1
              this.getImageInfoFromBiolucida(apiEndpoint, items, info)
            } else {
              let item = items.find(x => x.id === info.id)
              this.$set(item, 'thumbnail', this.defaultImg)
            }

            return Promise.reject('Maximum iterations reached.')
          }
        )
    }
  }
};