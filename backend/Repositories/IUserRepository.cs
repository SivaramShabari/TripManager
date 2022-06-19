using System.Collections.Generic;
using System.Threading.Tasks;
using TripManager.Models;

namespace TripManager.Repositories
{
    public interface IUserRepository
    {

        public Task<User> GetUser(string id);
        public Task<User> AddUser(User User);
        public Task<dynamic> DeleteUser(string id);
        public Task<User> UpdateUser(User User);
    }
}