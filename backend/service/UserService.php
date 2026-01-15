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
    }
?>