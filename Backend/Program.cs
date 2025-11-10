using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseHttpsRedirection();

app.MapPost("/huggingface", async ([FromBody] string text) =>
{
var apiKey = builder.Configuration["HuggingFace:ApiKey"];
    var apiUrl = "https://router.huggingface.co/hf-inference/models/tabularisai/multilingual-sentiment-analysis";

    using var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

    var content = new StringContent(
        JsonSerializer.Serialize(new { inputs = text }),
        Encoding.UTF8,
        "application/json"
    );

    var response = await client.PostAsync(apiUrl, content);
    var result = await response.Content.ReadAsStringAsync();

    return Results.Text(result, "application/json");
});

app.Run();
