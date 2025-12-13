package pl.mitm.agroman.sample;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/sample")
public class SampleController {

    private final ItemService service;

    public SampleController(ItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<Item> all() {
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<Item> create(@RequestBody Map<String, String> body) {
        String name = body.getOrDefault("name", "noname");
        return ResponseEntity.ok(service.create(name));
    }
}
