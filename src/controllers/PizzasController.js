import Pizza from '../models/Pizza';
import mail from '../config/mail';

class PizzasController {
  index(req, res) {
    const pizzas = Pizza.all();

    return res.render('pizzas', { pizzas });
  }

  neW(req, res) {
    res.render('pizzas/new');
  }

  create(req, res) {
    const { name, price } = req.body;
    const [pizzaThumbnail] = req.files;

    const newPizza = new Pizza(name, price, pizzaThumbnail.filename);

    if (!newPizza) {
      return res.redirect('/500');
    }

    const new_pizza_email = {
      from: 'Equipe PizzaExpress <noreply@pizzaexpress.com>',
      to: 'Luisito <luis.geniole@gmail.com>',
      subject: `Pizza ${name} cadastrada ✔`,
      text: `Foi cadastrada uma nova pizza no sistema:\nnome: ${name}\npreco: ${price}`,
      html: `<h1>Foi cadastrada uma nova pizza no sistema:</h1><p>nome: ${name}</p><p>preco: ${price}</p>`,
    };

    mail.sendMail(new_pizza_email, (error) => {
      if (error) return console.log(error);

      return console.log('New pizza email sent successfully'  );
    });

    return res.redirect('/pizzas');
  }

  // edit(req, res) {}
  
  // update(req, res) {}

  destroy(req, res) {
    const { id } = req.params;

    Pizza.destroy(id);

    return res.redirect('/pizzas');
  }
}

export default new PizzasController();
