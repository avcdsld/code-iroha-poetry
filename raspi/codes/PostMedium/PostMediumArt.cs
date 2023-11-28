using System;
using System.Collections.Generic;

interface IMediumRedefiner
{
    string RedefineMedium(List<string> media);
}

class PostMediumArt
{
    private List<string> media = new List<string>();

    public PostMediumArt(params string[] media)
    {
        media.AddRange(media);
    }

    public string RedefineMedium(IMediumRedefiner redefiner)
    {
        return redefiner.RedefineMedium(media);
    }

    static void Main(string[] args)
    {
        var art = new PostMediumArt(
                         "Painting", "Sculpture", "Code");
    }
}
