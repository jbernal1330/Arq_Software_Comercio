package microservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ordenDTO {

    // Producto <-- Inventario
    private Long productoId;
    private int productoCantidad;
    private Long precioProducto;

    // Cliente <-- Clientes
    private Long clienteId;
    private String clienteNombre;
    private String clienteApellido;
}
