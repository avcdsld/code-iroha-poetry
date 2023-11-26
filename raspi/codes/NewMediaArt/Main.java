class MediaArt { }

class NewMediaArt extends MediaArt {
    String innovativeElement;

    public NewMediaArt(String innovativeElement) {
        this.innovativeElement = innovativeElement;
    }
}

public class Main {
    public static void main(String[] args) {
        NewMediaArt fakeNewMediaArt
                             = new NewMediaArt("");
    }
}
