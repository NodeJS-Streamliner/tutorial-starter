exports.get404 = (req, res, next) => {
  res.status(404).render('page_not_found', {pageTitle: 'Page Not Found!', path: '/404'})
}
