using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace TripManager.Models
{
    public class Trip
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string Destination { get; set; }
        public int Budget { get; set; }
        public string Image { get; set; }
        public string UserId { get; set; }
    }
}
