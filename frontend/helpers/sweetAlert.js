import swal from 'sweetalert'

/***
 *
 * {
 *     title: 'title',
 *     content: 'content',
 *     actions: [
 *       {
 *          label: 'Yes',
 *          onClick: () => {},
 *       },
 *       {
 *          label: 'No',
 *          onClick: () => {},
 *       },
 *       ...
 *     ]
 * } 
 *
 **/
 
export const sweetAlert = async (props = {}) => {
  const { 
    title, 
    content, 
    actions: modalActions = [], 
    ...rest
  } = props
  const buttons = modalActions.reduce((accum, { label }) => {
    accum[label.toLowerCase()] = label
    return accum
  }, {})
  const noop = () => {}
  const asyncRequests = modalActions.reduce((accum, curr) => {
    const { label, onClick } = curr
    accum[label.toLowerCase()] = onClick || noop
    return accum
  }, {}) 

  try {
    const value = await swal({
      ...(title && { title }),
      ...(content && { text: content }),
      buttons: {
        cancel: 'Close',
        ...buttons,
      },
      ...rest
    })
    if (value) {
      await asyncRequests[value]()
    }
    swal.close()
  } catch(e) {
    throw e
  }
}

