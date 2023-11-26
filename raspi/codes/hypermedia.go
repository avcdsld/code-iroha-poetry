package main

type Hypermedia struct {
    Media []interface{}
}

func (h *Hypermedia) AddMedia(media interface{}) {
    h.Media = append(h.Media, media)
}

func main() {
    hypermedia := &Hypermedia{}
    hypermedia.AddMedia("art")
    hypermedia.AddMedia([]byte("art"))
}
