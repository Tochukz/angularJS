<?php
sleep(5);
http_response_code(200);
echo json_encode(['name'=>'Chucks', 'position'=>'Senior Dev', 'pay'=>45000]);