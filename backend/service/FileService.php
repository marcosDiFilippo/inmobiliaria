<?php
    class FileService {
        public function createFolderUser(array $data): array
        {
            $userId = $data['id_part'];

            $basePath = __DIR__ . "/../uploads/$userId";

            $paths = [
                'base' => $basePath,
                'dni' => "$basePath/dni",
                'salary' => "$basePath/recibo_sueldo"
            ];

            foreach ($paths as $path) {
                if (!is_dir($path)) {
                    if (!mkdir($path, 0755, true)) {
                        throw new RuntimeException("No se pudo crear el directorio: $path");
                    }
                }
            }

            return $paths;
        }

        public function saveFilesUser(array $files, array $paths): void
        {
            // DNI
            if (!isset($files['dni'])) {
                throw new RuntimeException('Archivo DNI faltante');
            }

            $dni = $files['dni'];

            if (!is_uploaded_file($dni['tmp_name'])) {
                throw new RuntimeException('Archivo DNI inválido');
            }

            $dniTarget = $paths['dni'] . '/' . $dni['hash'];

            if (!move_uploaded_file($dni['tmp_name'], $dniTarget)) {
                throw new RuntimeException('Error al guardar archivo DNI');
            }

            // RECIBO DE SUELDO
            if (!isset($files['salary'])) {
                throw new RuntimeException('Archivo recibo de sueldo faltante');
            }

            $salary = $files['salary'];

            if (!is_uploaded_file($salary['tmp_name'])) {
                throw new RuntimeException('Archivo recibo de sueldo inválido');
            }

            $salaryTarget = $paths['salary'] . '/' . $salary['hash'];

            if (!move_uploaded_file($salary['tmp_name'], $salaryTarget)) {
                throw new RuntimeException('Error al guardar archivo recibo de sueldo');
            }
        }
        public function generateFileName () {
            return bin2hex(random_bytes(16)) . '.webp';
        }
    }
?>