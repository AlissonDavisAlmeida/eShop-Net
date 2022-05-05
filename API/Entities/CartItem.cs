using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("CartItems")]
    public class CartItem
    {

        public int ID { get; set; }
        public int Quantity { get; set; }
        public int ProductID { get; set; }

        public Product Product {get; set;}

        public int CartID { get; set; }
        public Cart Cart { get; set; }
    }
}