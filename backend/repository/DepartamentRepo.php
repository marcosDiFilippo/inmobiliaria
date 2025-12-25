<?php
    include_once("Repository.php");
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

            return $result;
        }
        public function saveToDatabase($data, $ambients){
            $connection = Database::getConnection();

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
                $fk_inmueble = $connection->lastInsertId();

                foreach ($ambients as $ambient) {
                    $idAmbient = $ambient["id"];
                    $amount = $ambient["amount"];

                    $stmtAmbient = $connection->prepare("
                        INSERT INTO inmueble_ambiente (
                            fk_inmueble, 
                            fk_ambientes, 
                            cantidad_ambientes
                        ) VALUES (
                            :fk_inmueble,
                            :fk_ambientes,
                            :cantidad_ambientes
                        )
                    ");

                    $stmtAmbient->execute([
                        ":fk_inmueble" => $fk_inmueble,
                        ":fk_ambientes" => $idAmbient,
                        ":cantidad_ambientes" => $amount
                    ]);
                }
                
                echo json_encode([
                    "success" => true,
                    "id_inmueble" => $fk_inmueble
                ]);
                
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode([
                    "error" => "Error al insertar",
                    "detail" => $e->getMessage()
                ]);
            }
        }
        public function deleteFromDatabase(int $idProperty) {
            $connection = Database::getConnection();

            try {
                $connection->beginTransaction();

                // 1️⃣ Obtener la locacion asociada

                $stmtGetLocacion = $connection->prepare("
                    SELECT fk_locacion 
                    FROM inmueble 
                    WHERE id_inmueble = :id
                ");
                $stmtGetLocacion->execute([
                    ":id" => $idProperty
                ]);

                $locacion = $stmtGetLocacion->fetch(PDO::FETCH_ASSOC);

                if (!$locacion) {
                    $connection->rollBack();
                    http_response_code(404);
                    echo json_encode([
                        "error" => "Inmueble no encontrado"
                    ]);
                    return;
                }

                $idLocacion = $locacion["fk_locacion"];

                // 2️⃣ Borrar relaciones con ambientes
                $stmtDeleteAmbients = $connection->prepare("
                    DELETE FROM inmueble_ambiente 
                    WHERE fk_inmueble = :id
                ");
                $stmtDeleteAmbients->execute([
                    ":id" => $idProperty
                ]);

                // 3️⃣ Borrar inmueble
                $stmtDeleteInmueble = $connection->prepare("
                    DELETE FROM inmueble 
                    WHERE id_inmueble = :id
                ");
                $stmtDeleteInmueble->execute([
                    ":id" => $idProperty
                ]);

                // 4️⃣ Borrar locacion
                $stmtDeleteLocacion = $connection->prepare("
                    DELETE FROM locacion 
                    WHERE id_locacion = :id
                ");
                $stmtDeleteLocacion->execute([
                    ":id" => $idLocacion
                ]);

                $connection->commit();

                echo json_encode([
                    "success" => true
                ]);

            } catch (PDOException $e) {
                $connection->rollBack();
                http_response_code(500);
                echo json_encode([
                    "error" => "Error al eliminar",
                    "detail" => $e->getMessage()
                ]);
            }
        }

    }
?>