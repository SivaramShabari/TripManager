using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
public class Context
{
    private readonly IConfiguration configuration;
    private readonly string connectionString;
    public Context(IConfiguration configuration)
    {
        this.configuration = configuration;
        this.connectionString = configuration.GetConnectionString("SqlConnection");
        System.Diagnostics.Debug.WriteLine("connectionString");
        System.Diagnostics.Debug.WriteLine(connectionString);
        Console.WriteLine("connectionString:" + connectionString);
    }
    public IDbConnection CreateConnection()
        => new SqlConnection(connectionString);
}