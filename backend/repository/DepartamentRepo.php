<?php
    include_once("../cors.php");
    include_once("Repository.php");
    include_once("../model/Database.php");
    class DepartamentRepo extends Repository {
        public function getData()
        {
            $connection = Database::getConnection();

            $stmt = $connection->query(
                "SELECT 
                            id_inmueble,
                            calle,
                            numero_dpto,
                            fecha_creacion,
                            precio_venta,
                            precio_alquiler,
                            descripcion,
                            tipo
                        FROM `inmueble`
                        INNER JOIN locacion ON inmueble.fk_locacion = locacion.id_locacion
                        INNER JOIN tipo_inmueble ON inmueble.fk_tipo_inmueble = tipo_inmueble.id_tipo_inmueble
                        INNER JOIN estado_inmueble ON inmueble.fk_estado_inmueble = estado_inmueble.id_estado_inmueble;");
            
            $result = $stmt->fetchAll();

            echo json_encode($result);
        }
        public function saveToDatabase($data){
            $connection = Database::getConnection();



            echo "ACAAAA";
            foreach ($data["ambients"] as $key => $value) {
                echo $value;
            }
            try {
                $stmtLocacion = $connection->prepare("
                    INSERT INTO locacion (calle, numero_calle, numero_dpto)
                    VALUES (:name_street, :number_street, :number_dpto)
                ");

                $stmtLocacion->execute([
                    ":name_street" => $data["name_street"],
                    ":number_street"   => $data["number_street"],
                    ":number_dpto"   => $data["number_dpto"]
                ]);

                $idLocacion = $connection->lastInsertId();

                $stmtInmueble = $connection->prepare("
                    INSERT INTO inmueble (
                        descripcion,
                        precio_venta,
                        precio_alquiler,
                        fk_locacion,
                        fk_tipo_inmueble,
                        fk_estado_inmueble,
                        fecha_creacion  
                    ) VALUES (
                        :description,
                        :sale_price,
                        :rental_price,
                        :fk_locacion,
                        :property_type,
                        :property_state,
                        NOW()
                    )
                ");

                
                $stmtInmueble->execute([
                    ":description"     => $data["description"],
                    ":sale_price" => $data["sale_price"],
                    ":rental_price" => $data["rental_price"],
                    ":fk_locacion" => $idLocacion,
                    ":property_type"   => $data["property_type"],
                    ":property_state"  => $data["property_state"]
                ]);

                
                /*
                $fk_inmueble = $connection->lastInsertId();

                $stmtAmbiente = $connection->prepare("INSERT INTO 
                `inmueble_ambiente`
                (`fk_inmueble`, `fk_ambientes`, `cantidad_ambientes`) 
                VALUES 
                ('[value-1]','[value-2]','[value-3]')");
                */
                
                echo json_encode([
                    "success" => true,
                    "id_inmueble" => $connection->lastInsertId()
                ]);
                
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode([
                    "error" => "Error al insertar",
                    "detail" => $e->getMessage()
                ]);
            }
        }
    }
    $deapartamentRepo = new DepartamentRepo();
    $deapartamentRepo->getData();
?>