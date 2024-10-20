package microservice.controller;

import microservice.entities.Orden;
import microservice.service.OrdenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orden")
public class OrdenController {

    @Autowired
    private OrdenService ordenService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveOrden(@RequestBody Orden orden) {
        ordenService.save(orden);
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAllOrden(){
        return ResponseEntity.ok(ordenService.findAll());
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ordenService.findById(id));
    }

    @GetMapping("/search-by-client/{idCliente}")
    public ResponseEntity<?> findByIdClient(@PathVariable Long idCliente) {
        return ResponseEntity.ok(ordenService.findByIdClient(idCliente));
    }
}
