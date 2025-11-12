using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=messages.db"));

var app = builder.Build();

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.MapPost("/huggingface", async ([FromBody] Message message, AppDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(message.Text))
        return Results.BadRequest(new { error = "Lütfen duygu analizi için bir metin girin." });

    var apiUrl = "https://elbia-emotion-analysis-api.hf.space/predict";
    var requestBody = new { data = new[] { message.Text } };

    using var client = new HttpClient();
    var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
    var response = await client.PostAsync(apiUrl, content);
    var result = await response.Content.ReadAsStringAsync();

    if (response.IsSuccessStatusCode)
    {
        using var doc = JsonDocument.Parse(result);
        string sentiment = "unknown";

        if (doc.RootElement.TryGetProperty("data", out var dataProp)
            && dataProp.ValueKind == JsonValueKind.Array
            && dataProp.GetArrayLength() > 0)
        {
            var inner = dataProp[0];
            if (inner.ValueKind == JsonValueKind.String)
                sentiment = inner.GetString() ?? "unknown";
        }

        message.Sentiment = sentiment;
    }
    else
    {
        message.Sentiment = $"API Hatası ({response.StatusCode})";
    }

    db.Messages.Add(message);
    await db.SaveChangesAsync();

    return Results.Ok(message);
});

app.MapGet("/messages", async (AppDbContext db) => await db.Messages.ToListAsync());

app.Run();
