<?php
    include_once("FileService.php");
    include_once("../repository/UserRepo.php");
    class UserService {
        private UserRepo $userRepo;
        private FileService $fileService;
        public function __construct()
        {
            $this->userRepo = new UserRepo();
            $this->fileService = new FileService();
        }
        public function createUserWithDocuments (array $dataTenant, array $files) {
            $connection = Database::getConnection();

            $dataPart = [];

            $connection->beginTransaction(); 

            $fileNameDni = $this->fileService->generateFileName();
            $fileNameSalary = $this->fileService->generateFileName();

            $files["dni"]["hash"] = $fileNameDni;
            $files["salary"]["hash"] = $fileNameSalary;
            
            try {
                $dataPart = $this->userRepo->createUser(json_encode($dataTenant));

                $this->userRepo->insertDocumentsFromUser($dataPart, $files);

                $paths = $this->fileService->createFolderUser($dataPart);

                $this->fileService->saveFilesUser($files, $paths);
                $connection->commit();
            }
            catch (Exception $e) {
                $connection->rollBack();
                echo json_encode($e->getMessage());
            }
        }
        public function validateDniRepeats (array $users) {
            for ($i = 0; $i < count($users); $i++) {
                $currentDni = $users[$i]["dni"];
                
                if (!isset($users[$i + 1])) {
                    break;
                }
                
                if ($currentDni == $users[$i + 1]["dni"]) {
                    throw new Exception("No se pueden repetir los dnis entre las partes");
                }
            }
        }
        public function verificateDniOfUsers (array $users) {
            try {
                $this->validateDniRepeats($users);

                $usersOfDatabase = $this->userRepo->getData();

                $this->searchUserForDni($users, $usersOfDatabase);
            
                echo json_encode("todo bien");
            }
            catch (Exception $e) {
                echo json_encode($e->getMessage());
            }
        }
        
        public function searchUserForDni (array $users, array $usersOfDatabase) {
            $usersDnis = [];

            foreach ($usersOfDatabase as $userOfDatabase) {
                $usersDnis[$userOfDatabase["dni"]] = true;
            }

            for ($i = count($users) - 1; $i >= 0; $i--) {
                if (isset($usersDnis[$users[$i]["dni"]]) == true) {
                    array_splice($users, $i, 1);
                    continue;
                }
                throw new Exception("El dni " . $users[$i]["dni"] . " no fue encontrado en el registro de inquilinos");
            }
        }
    }
?>