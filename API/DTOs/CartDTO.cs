using System.Collections.Generic;

namespace API.DTOs
{
    
    public class CartDTO
    {
        public int ID {get; set;}

        public string BuyerID {get; set;}
        public List<CartItemDTO> items {get; set;}
    
    }
}