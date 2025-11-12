namespace Backend.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string? Alias { get; set; }
        public string? Text { get; set; }
        public string? Sentiment { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
