package microservice.entities;


import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@Table(name = "ordenes")
@AllArgsConstructor
@NoArgsConstructor
public class Orden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Producto <-- Inventario
    private Long productoId;
    private int productoCantidad;
    private Long precioProducto;

    // Cliente <-- Clientes
    private Long clienteId;
    private String clienteNombre;
    private String clienteApellido;
}
