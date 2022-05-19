using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Cart
    {
        public int ID { get; set; }

        public string BuyerID { get; set; }

        public List<CartItem> Items { get; set; } = new List<CartItem>();


        public void AddItem(Product product, int quantity)
        {
            var existingItem = Items.FirstOrDefault(item => item.ProductID == product.Id);

            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
            }

            else
            {
                Items.Add(new CartItem
                {
                    Product = product,
                    Quantity = quantity
                });
            }



        }

        public void removeItem(int productID, int quantity)
        {
            var existingItem = Items.FirstOrDefault(item => item.ProductID == productID);

            if(existingItem == null){
                return;
            }

            existingItem.Quantity -= quantity;
            if(existingItem.Quantity == 0)
            {
                Items.Remove(existingItem);
            }
        }

    }
}