// create UserRepository class implementing IRepository interface
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripManager.Models;
using Dapper;
namespace TripManager.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly Context context;

        public UserRepository(Context context)
        {
            this.context = context;
        }

        public async Task<User> AddUser(User User)
        {
            var sql = "INSERT INTO users (Id, Name, Email, Password) VALUES (@Id, @Name, @Email, @Password);";
            using (var connection = context.CreateConnection())
            {
                await connection.ExecuteAsync(sql, User);
                return User;
            }

        }

        public async Task<dynamic> DeleteUser(string id)
        {
            var sql = "DELETE FROM users WHERE Id = @Id";
            using (var connection = context.CreateConnection())
            {
                return await connection.QueryFirstAsync<User>(sql, new { Id = id });
            }
        }

       
        public async Task<User> GetUser(string email)
        {
            var sql = "SELECT * FROM users WHERE Email = @Email";
            using (var connection = context.CreateConnection())
            {
                var res = await connection.QueryFirstAsync<User>(sql, new { Email = email });
                return res;
            }
        }

        public async Task<User> UpdateUser(User User)
        {
            var query = "UPDATE users SET Name = @Name, Email = @Email, Password = @Password WHERE Id = @Id";
                using (var connection = context.CreateConnection())
                {
                    var res = await connection.QueryAsync<User>(query, User);
                    return res.FirstOrDefault();
                }
        }
    }
}


