package main

type Hypermedia struct {
    Media []interface{}
}

func (h *Hypermedia) AddMedium(medium interface{}) {
    h.Media = append(h.Media, medium)
}

func main() {
    hypermedia := &Hypermedia{}
    hypermedia.AddMedium("art")
    hypermedia.AddMedium([]byte("art"))
}
