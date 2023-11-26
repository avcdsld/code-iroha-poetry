using System;
using System.Collections.Generic;

interface IMediaRedefiner
{
    string RedefineMedia(List<string> media);
}

class PostMediumArt
{
    private List<string> media = new List<string>();

    public PostMediumArt(params string[] mediaToAdd)
    {
        media.AddRange(mediaToAdd);
    }

    public string RedefineMedia(IMediaRedefiner redefiner)
    {
        return redefiner.RedefineMedia(media);
    }

    static void Main(string[] args)
    {
        var art = new PostMediumArt(
                         "Painting", "Sculpture", "Code");
    }
}
