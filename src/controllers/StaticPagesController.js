class StaticPagesController {
  home(req, res) {
    return res.render('staticPages/index');
  }
}

export default new StaticPagesController();
